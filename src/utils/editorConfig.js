export default {
   indentUnit: 4,
   foldGutter: true,
   lineNumbers: true,
   matchBrackets: true,
   styleActiveLine: true,
   autoCloseBrackets: true,
   theme: 'tomorrow-night-eighties',
   mode:  "javascript",
   keyMap: 'sublime',
   lint: {
     esversion: 6
   },
   gutters: [
     'CodeMirror-linenumbers',
     'CodeMirror-foldgutter'
   ],
   extraKeys: {
     // prevent default
     'Ctrl-Enter': () => {
       return false;
     },
     // prevent default
     'Cmd-Enter': () => {
       return false;
     }
   }
}
