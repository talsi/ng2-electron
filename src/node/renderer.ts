const mkdirp = window['require']('mkdirp');
const fs = window['require']('fs');
const getDirName = window['require']('path').dirname;

export const renderer = {

  writeFile: (path: string, contents: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      mkdirp(getDirName(path), (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        fs.writeFile(path, contents, () => {
          console.log("The file was saved!");
          resolve(null);
        });
      });
    });
  }
};
