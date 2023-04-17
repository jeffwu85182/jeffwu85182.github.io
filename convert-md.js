const fs = require('fs-extra');
const path = require('path');
const glob = require('glob').Glob;

const postsPath = 'source/_posts'; // 要轉換的 md 文件所在的目錄

new glob(`${postsPath}/**/*.md`, (err, files) => {
  if (err) {
    console.error('讀取文件列表失敗：', err);
    return;
  }

  files.forEach(async (file) => {
    try {
      const fileContent = await fs.readFile(file, 'utf8');
      const dirname = path.dirname(file);
      const basename = path.basename(file, '.md');

      const assetImgRegex = /{%\s*asset_img\s+(.*?)\s+(.*?)\s*%}/g;
      const mdImgRegex = /!\[(.*?)\]\((.+?)\)/g;

      const convertAssetImg = (match, filename, description) => {
        return `![${description}](images/${basename}/${filename})`;
      };

      const convertMdImg = (match, description, filename) => {
        if (!filename.startsWith('images/')) {
          return `![${description}](images/${basename}/${filename})`;
        } else {
          return match;
        }
      };

      const newFileContent = fileContent
        .replace(assetImgRegex, convertAssetImg)
        .replace(mdImgRegex, convertMdImg);

      await fs.writeFile(file, newFileContent, 'utf8');
      console.log(`成功轉換：${file}`);
    } catch (error) {
      console.error(`處理文件 ${file} 時出錯：`, error);
    }
  });
});
