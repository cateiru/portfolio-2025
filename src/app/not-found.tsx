import Link from "next/link"
import { convertTextContent } from "@/utils/terminal-utils"

const NOT_FOUND_AA = `
██╗  ██╗ ██████╗ ██╗  ██╗
██║  ██║██╔═══██╗██║  ██║
███████║██║   ██║███████║
╚════██║██║   ██║╚════██║
     ██║╚██████╔╝     ██║
     ╚═╝ ╚═════╝      ╚═╝
`

export default function NotFound() {
  return (
    <div className="not-found-terminal">
      <div className="not-found-header">
        <span className="not-found-prompt">cateiru@portfolio</span>
        <span className="not-found-path">:~$</span>
        <span className="not-found-command">ls /page/not/found</span>
      </div>
      <div className="not-found-output">
        <p className="not-found-error">ls: cannot access '/page/not/found': No such file or directory</p>
        <div className="not-found-ascii">
          {NOT_FOUND_AA.split("\n").map(line => {
            return <p key={`not-found-aa-${line}`}>{convertTextContent(line)}</p>
          })}
        </div>
        <div className="not-found-message">
          <p>ページが見つかりませんでした。</p>
          <p>The page you are looking for does not exist.</p>
        </div>
        <div className="not-found-navigation">
          <Link href="/" className="not-found-link">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
