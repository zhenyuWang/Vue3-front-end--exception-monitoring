// 需要安装@types/glob对ts做支持
import glob from "glob";
import path from "path";
import fs from "fs";
import http from "http";
export default function uploadSourceMap({
  // 基础接口地址
  baseUrl,
  // 处理目标文件夹接口地址
  handleTargetFolderUrl,
  // 上传sourcemap文件地址
  uploadUrl,
}) {
  return {
    name: "upload-sourcemap",
    // 打包完成后钩子
    closeBundle() {
      console.log('closeBundle');
      // 获取当前环境
      let env = "uat";
      if (baseUrl === "production_base_api") {
        env = "prod";
      }
      // 上传文件方法
      function upload(url, file, env) {
        return new Promise((resolve) => {
          const req = http.request(
            `${url}?name=${path.basename(file)}&&env=${env}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/octet-stream",
                Connection: "keep-alive",
                "Transfer-Encoding": "chunked",
              },
            }
          );
          // 读取文件并给到上送请求对象
          fs.createReadStream(file)
            .on("data", chunk => {
              req.write(chunk);
            })
            .on("end", () => {
              req.end();
              resolve("end");
            });
        });
      }

      // 处理目标文件夹（没有创建，有则清空）
      function handleTargetFolder() {
        http
          .get(`${handleTargetFolderUrl}?env=${env}`, () => {
            console.log("handleTargetFolderUrl success");
          })
          .on("error", (e) => {
            console.log(`handle folder error: ${e.message}`);
          });
      }
      handleTargetFolder();
      // 读取sourcemap文件 上传并删除
      async function uploadDel() {
        const list = glob.sync(path.join("./dist", "./**/*.{js.map,}"));
        for (const filename of list) {
          await upload(uploadUrl, filename, env);
          await fs.unlinkSync(filename);
        }
      }
      uploadDel();
    },
  };
}
