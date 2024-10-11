export function copy(text) {
    return new Promise((resolve, reject) => {
      if ("clipboard" in navigator) {
        navigator.clipboard.writeText(text);
        resolve('clipboard复制成功')
      }
      try {
        let body = document.body;
        if (!body) {
          reject(Error());
        }
        let pre = document.createElement("pre");
        pre.style.width = "1px";
        pre.style.height = "1px";
        pre.style.position = "fixed";
        pre.style.top = "5px";
        pre.textContent = text;
        body.appendChild(pre);
        // Clear any current selection
        const selection = window.getSelection();
        if (null == selection) {
          reject(Error());
        }
        selection.removeAllRanges();
        // Select paragraph
        const range = document.createRange();
        range.selectNodeContents(pre);
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
        body.removeChild(pre)
        resolve('execCommand复制成功')
      } catch (error) {
        reject(Error())
      }
    })
  }
