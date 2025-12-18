export const removeSpace = (content: string) => {
    if (!content) return "";
    
    const patterns = [
      /\s+style="[^"]*"/g,  // Xóa tất cả thuộc tính style
      /[\u200B-\u200D\uFEFF]/g,  // Loại bỏ các ký tự không nhìn thấy
      /<div>\s*<br\s*\/?>\s*<\/div>/g,  // Div chứa br
      /<div>\s*<\/div>/g,  // Div trống
      /<div>\s*&nbsp;\s*<\/div>/g,  // Div chỉ chứa &nbsp;
      /<p[^>]*>\s*<span[^>]*>\s*<\/span>\s*<\/p>/g,  // Paragraph chứa span trống
      /<p[^>]*>\s*(&nbsp;)?\s*<\/p>/g,  // Paragraph trống hoặc chỉ chứa &nbsp;
      /<div[^>]*style="[^"]*text-align:\s*justify[^"]*">\s*<span[^>]*style="[^"]*background-color:[^"]*">\s*<br>\s*<\/span>\s*<\/div>/g,
      /<div[^>]*style="[^"]*text-align:\s*justify[^"]*">\s*<br\s*\/?>\s*<\/div>/g,
      /<p[^>]*style="[^"]*line-height:[^"]*">\s*<span[^>]*>[^<]*<br\s*\/?>[^<]*<\/span>\s*<\/p>/g,
      /<div>\s*<span[^>]*style="[^"]*font-size:\s*\d+px[^"]*">\s*<br\s*\/?>\s*<\/span>\s*<\/div>/g,
      /<p>\s*<span[^>]*style="[^"]*font-family:[^"]*Times New Roman[^"]*">\s*<br[^>]*>(?:<!--\[if !supportLineBreakNewLine\]-->)?\s*<br[^>]*>(?:<!--\[endif]-->)?\s*<\/span>\s*<\/p>/g,
      /<p[^>]*style="[^"]*white-space:\s*pre-wrap[^"]*">\s*<strong>\s*<br\s*\/?>\s*<\/strong>\s*<\/p>/g,
      /<p[^>]*style="[^"]*white-space:\s*pre-wrap[^"]*">\s*<br\s*\/?>\s*<\/p>/g,
      /<p[^>]*style="[^"]*--tw-[^"]*">\s*<br[^>]*style="[^"]*--tw-[^"]*">\s*<\/p>/g,
      /<p[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/g,
      /<div[^>]*style="[^"]*--tw-[^"]*">\s*<br[^>]*style="[^"]*--tw-[^"]*">\s*<\/div>/g,
      /<p[^>]*style="[^"]*--tw-[^"]*">\s*<strong[^>]*style="[^"]*--tw-[^"]*">\s*<br[^>]*style="[^"]*--tw-[^"]*">\s*<\/strong>\s*<\/p>/g,
      /<p>\s*<span>\s*<br>\s*(?:<!--\[if !supportLineBreakNewLine\]-->)?\s*<br>\s*(?:<!--\[endif]-->)?\s*<\/span>\s*<\/p>/g,
      /<p>\s*<strong>\s*<br\s*\/?>\s*<\/strong>\s*<\/p>/g
    ];
  
    return patterns.reduce((result, pattern) => result.replace(pattern, ""), content);
};
  