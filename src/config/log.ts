import pkg from '../../package.json'
/**
 * Admin Log
 */
export const AdminLog = () => {
  //博客地址
  const blogSite = 'https://fuyouplus.cn'

  //Gitee仓库地址
  const giteeRepoUrl = 'https://gitee.com/fuyouplus/admin-template'

  //预览站点地址
  const previewSiteUrl = ' https://like-a-mayfly.gitee.io/admin-template'

  //文档站点地址
  const docSiteUrl = 'https:doc.cn'

  //Admin Preview
  console.info(
    '\n' + ' %c Admin Preview v' + pkg.version + ` %c  ${previewSiteUrl} ` + '\n',
    'color: #E5E7EB; background: #6739b6; padding:5px 0;',
    'background: #333; padding:5px 0;'
  )

  //Doc
  //   console.info(
  //     "\n" + " %c Doc v" + pkg.version + ` %c  ${docSiteUrl} ` + "\n",
  //     "color: #E5E7EB; background: #6739b6; padding:5px 0;",
  //     "background: #333; padding:5px 0;"
  //   )

  //Blog
  console.info(
    '\n' + ' %c 微若蜉蝣 ' + ` %c  ${blogSite} ` + '\n',
    'color: #E5E7EB; background: #6739b6; padding:5px 0;',
    'background: #333; padding:5px 0;'
  )

  //Gitee Repo
  console.info(
    '\n' + ' %c Gitee ' + ` %c  ${giteeRepoUrl} ` + '\n',
    'color: #E5E7EB; background: rgb(199,29,35); padding:5px 0;',
    'background: #333; padding:5px 0;'
  )

  console.info('~❀~ 发现控制台报错请及时联系作者解决 ~❀~')
}

export default function setupAdminLog() {
  AdminLog()
}
