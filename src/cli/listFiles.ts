import fs from 'fs'
import path from 'path'

const listFiles = (targetDir: string) => {
  const list: string[] = []

  fs.readdirSync(targetDir).forEach(file => {
    if (file.startsWith('$') || file.startsWith('@')) return

    const target = path.posix.join(targetDir, file)

    if (fs.statSync(target).isFile()) {
      const text = fs.readFileSync(target, 'utf8')
      if (
        /(\n|^)export default/.test(text) &&
        /(\n|^)export (interface|type) Methods /.test(text)
      ) {
        list.push(target)
      }
    } else if (fs.statSync(target).isDirectory()) {
      list.push(...listFiles(target))
    }
  })

  return list
}

export default listFiles
