import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

let text = `
### Hi there 👋
[![kkoon9's github stats](https://github-readme-stats.vercel.app/api?username=kkoon9&theme=tokyonight)](https://github.com/anuraghazra/github-readme-stats)

[![solved.ac tier](http://mazassumnida.wtf/api/generate_badge?boj=rndrnjs2003)](https://solved.ac/rndrnjs2003)
## Pronouns
**남 궁 권 (Nam Koong Kwon)**
- [Blog](https://kkoon9.tistory.com)
- [Email](mailto:rndrnjs2003@naver.com)

## 블로그 최신글
`;
// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL("https://kkoon9.tistory.com/rss");

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 5; i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    text += `
    ${i + 1}. <a href=${link}>${title}</a></br><br><br>

    `;
  }

  // README.md 파일 작성
  writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("업데이트 완료");
})();