import React, { useState, useEffect } from 'react'
import Editor from "./components/Editor"
import useLocalStorage from "./hooks/useLocalStorage"
import "codemirror/theme/material.css";
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/night.css';
import './App.css'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [javascript, setJavascript] = useLocalStorage('javascript', '')
  const [srcDoc, setSrcDoc] = useState('')
  const [theme, setTheme] = useState("dracula")
  const themeArray = ['dracula', 'material', 'mdn-like', 'the-matrix', 'night']
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${javascript}</script>
        </html>
      `)
    }, 250)
    // console.log(srcDoc)
    return () => clearTimeout(timeout)
  }, [html, css, javascript])

  return (
    <div className="app">
      {/* == */}
     

       
{/* ==== */}
      <div className='theme' style={{ marginBottom: "10px" }
      }>
        <label for="theme">Choose a theme: </label>
        <select name="theme" onChange={(el) => {
          setTheme(el.target.value)
        }}>
          {
            themeArray.map(theme => (
              <option value={theme}>{theme}</option>
            ))
          }
        </select>
      </div >
      <div className="pane top-pane">
        <Editor
          launguage="xml"
          label="HTML"
          value={html}
          onChange={setHtml}
          theme={theme}
        />
        <Editor
          launguage="css"
          label="CSS"
          value={css}
          onChange={setCss}
          theme={theme}
        />
        <Editor
          launguage="javascript"
          label="JavaScript"
          value={javascript}
          onChange={setJavascript}
          theme={theme}
        />
      </div>
      <div className="bottom-pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
}

export default App;
