import React from 'react';

function parseMarkdownTable(lines: string[], startIndex: number): { html: React.ReactNode; endIndex: number } | null {
  const headerLine = lines[startIndex];
  const separatorLine = lines[startIndex + 1];
  if (!separatorLine || !separatorLine.match(/^\|[\s\-:|]+\|$/)) return null;

  const headers = headerLine.split('|').filter(Boolean).map((h) => h.trim());
  const alignments = separatorLine
    .split('|')
    .filter(Boolean)
    .map((c) => {
      if (c.startsWith(':') && c.endsWith(':')) return 'center';
      if (c.endsWith(':')) return 'right';
      return 'left';
    });

  const rows: string[][] = [];
  let i = startIndex + 2;
  while (i < lines.length && lines[i].startsWith('|')) {
    rows.push(lines[i].split('|').filter(Boolean).map((c) => c.trim()));
    i++;
  }

  return {
    html: (
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '15px',
          }}
        >
          <thead>
            <tr>
              {headers.map((h, idx) => (
                <th
                  key={idx}
                  style={{
                    textAlign: (alignments[idx] as 'left' | 'center' | 'right') || 'left',
                    padding: '12px 16px',
                    background: '#f1f5f9',
                    color: '#0f172a',
                    fontWeight: 700,
                    borderBottom: '2px solid #e2e8f0',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    style={{
                      textAlign: (alignments[cIdx] as 'left' | 'center' | 'right') || 'left',
                      padding: '10px 16px',
                      color: '#334155',
                      borderBottom: '1px solid #f1f5f9',
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    endIndex: i - 1,
  };
}

function parseInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function renderMarkdown(content: string): React.ReactNode {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Image suggestion
    if (line.startsWith('[📸')) {
      const inner = line.replace(/^\[📸\s*|\]$/g, '');
      elements.push(
        <div
          key={i}
          style={{
            background: '#f0f4ff',
            border: '1px dashed #93c5fd',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            fontSize: '14px',
            color: '#2563eb',
            lineHeight: 1.6,
          }}
        >
          {inner}
        </div>,
      );
      i++;
      continue;
    }

    // H2 heading
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={i}
          style={{
            fontSize: '28px',
            fontWeight: 900,
            color: '#0f172a',
            margin: '36px 0 16px 0',
            lineHeight: 1.3,
          }}
        >
          {parseInline(line.slice(3))}
        </h2>,
      );
      i++;
      continue;
    }

    // H3 heading
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={i}
          style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#1e293b',
            margin: '28px 0 12px 0',
            lineHeight: 1.3,
          }}
        >
          {parseInline(line.slice(4))}
        </h3>,
      );
      i++;
      continue;
    }

    // Table
    if (line.startsWith('|')) {
      const tableResult = parseMarkdownTable(lines, i);
      if (tableResult) {
        elements.push(<div key={i}>{tableResult.html}</div>);
        i = tableResult.endIndex + 1;
        continue;
      }
    }

    // Unordered list
    if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul
          key={i - listItems.length}
          style={{
            paddingLeft: '24px',
            margin: '12px 0 20px 0',
            color: '#334155',
            fontSize: '16px',
            lineHeight: 1.8,
          }}
        >
          {listItems.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '6px' }}>
              {parseInline(item)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Bold lead paragraph (starts with ** and no other formatting)
    if (line.startsWith('**') && line.includes('**') && !line.startsWith('** ')) {
      const boldMatch = line.match(/^\*\*(.+?)\*\*(.*)/);
      if (boldMatch) {
        const boldText = boldMatch[1];
        const rest = boldMatch[2];
        elements.push(
          <p
            key={i}
            style={{
              fontSize: '16px',
              color: '#334155',
              lineHeight: 1.8,
              margin: '0 0 16px 0',
            }}
          >
            <strong>{boldText}</strong>
            {rest}
          </p>,
        );
        i++;
        continue;
      }
    }

    // Regular paragraph — collect consecutive text lines
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('|') &&
      !lines[i].startsWith('- ') &&
      !lines[i].startsWith('[📸') &&
      !lines[i].startsWith('> ')
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    if (paragraphLines.length > 0) {
      elements.push(
        <p
          key={i - paragraphLines.length}
          style={{
            fontSize: '16px',
            color: '#334155',
            lineHeight: 1.9,
            margin: '0 0 16px 0',
          }}
        >
          {paragraphLines.map((pl, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <br />}
              {parseInline(pl)}
            </React.Fragment>
          ))}
        </p>,
      );
      continue;
    }

    i++;
  }

  return <>{elements}</>;
}
