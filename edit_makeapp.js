const fs = require('fs');
const path = 'src/components/Hospital/Makeapp.jsx';
let content = fs.readFileSync(path, 'utf8');

// Header helper
const helperFunction = `
  const renderPageNumbers = () => {
    const totalPages = Math.ceil(doctors.length / itemsPerPage);
    const pages = [];
    const maxVisible = 9;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 6) {
        for (let i = 1; i <= 8; i++) pages.push(i);
        pages.push('...');
      } else if (currentPage > 6 && currentPage < totalPages - 4) {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 7; i <= totalPages; i++) pages.push(i);
      }
    }
    return pages;
  };
`;

// Find where to insert the helper (before the return)
const returnMatch = content.match(/\n\s+return \(/);
if (returnMatch) {
    content = content.replace(returnMatch[0], helperFunction + returnMatch[0]);
}

// Replace the pagination UI mapping
const paginationMapRegex = /\{\[\.\.\.Array\(Math\.ceil\(doctors\.length \/ itemsPerPage\)\)\]\.map\(\(_, i\) => \([\s\S]*?\}\)\)\}/;
const newPaginationUI = `{renderPageNumbers().map((page, i) => (
              <button
                key={i}
                disabled={page === '...'}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                className={\`w-[32px] h-[32px] flex items-center justify-center rounded-[6px] transition-all font-medium
                  \${currentPage === page 
                    ? 'bg-[#313131] text-white shadow-md' 
                    : page === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'text-[#313131] hover:bg-gray-100'
                  }
                \`}
              >
                {page}
              </button>
            ))}`;

content = content.replace(paginationMapRegex, newPaginationUI);

fs.writeFileSync(path, content);
console.log('Successfully updated Makeapp.jsx');
