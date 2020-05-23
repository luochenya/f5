import { post, posts } from './http'

// 註冊
export const AccountRegister = p => post('/Account/register', p)
// 登入
export const AccountLogin = p => post('/Account/login_new', p)
// 發送驗證碼
export const AccountSendCode = p => post('/Account/send_code', p)
// 驗證
export const AccountVerify = p => post('/Account/verify', p)
// 找回密碼
export const AccountRetrievePassword = (p, h) => post('/Account/retrieve_password', p, h)
// 登出
export const accountLogout = h => post('/Account/logout', {}, h)
// 獲取會員信息
export const getUserInfo = h => post('/Account/get_user_info', {}, h)
// 設置用戶信息
export const setUserInfo = (p, h) => post('/Account/set_user_info', p, h)
// 修改密碼
export const updatePassword = (p, h) => post('/Account/update_password', p, h)
// 首页
export const systemHomePage = h => post('/System/home_page', {}, h)
// 移動端banner
export const getMobileBanner = h => post('/News/get_mobile_banner', {}, h)
// 本地消息內容
export const systemHomeNewsRead = (p, h) => post('/System/home_news_read', p, h)
// f5最新消息列表
export const newsFiveNewsList = (p, h) => post('/News/five_news_list', p, h)
// f5最新消息内容
export const newsFiveNewsRead = (p, h) => post('/News/five_news_read', p, h)
// 代理商最新消息列表
export const getAgentNewsList = (p, h) => post('/News/agent_news_list', p, h)
// 代理商最新消息内容
export const getAgentNewsRead = (p, h) => post('/News/agent_news_read', p, h)
// 经销商最新消息列表
export const getDealerNewsList = (p, h) => post('/News/dealer_news_list', p, h)
// 经销商最新消息内容
export const getDealerNewsRead = (p, h) => post('/News/dealer_news_read', p, h)
// 精選文章
export const systemFeaturedArticles = (p, h) => post('/System/featured_articles', p, h)
// 文章详情
export const getFeaturedArticlesRead = (p, h) => post('/System/featured_articles_read', p, h)
// 文章分类
export const systemGetArticleClass = h => post('/System/get_article_class', {}, h)
// 下載专区分類
export const getFileClass = h => post('/System/get_file_class', {}, h)
// 下載专区banner
export const getDownloadBanner = (p, h) => post('/System/get_download_banner', p, h)
// 下載專區
export const getFileList = (p, h) => post('/System/get_file_list', p, h)
// 上传图片
export const uploadPicture = (p, h) => posts('/System/upload_picture', p, h)
// 新增文章
export const setInsertArticle = (p, h) => post('/System/insert_article', p, h)
// 删除草稿
export const delInsertArticle = (p, h) => post('/System/del_insert_draft', p, h)
// 存草稿
export const setInsertDraft = (p, h) => post('/System/insert_draft', p, h)
// 我的文章
export const setMyArticle = (p, h) => post('/System/my_article', p, h)
// 代理商文章列表 （后续要改动）
export const getAgentArticleList = (p, h) => post('/News/agent_article_list', p, h)
// 首页web端轮播
export const getHomePageWeb = h => post('/System/home_page_web', {}, h)
// 首頁最新消息列表
export const getHomeNewsList = (p, h) => post('/System/home_news_list', p, h)
// 首頁消息內容
export const getHomeNewsRead = (p, h) => post('/System/home_news_read', p, h)
// 最新消息上一篇，下一篇
export const getFlipOver = (p, h) => post('News/flip_over', p, h)
// 精选文章上一篇，下一篇
export const getFlipOverArticle = (p, h) => post('/System/flip_over_article', p, h)
/** 专案 */
// 获取产品型号
export const getProductType = h => post('/System/get_product_type', {}, h)
// 获取产品模组
// export const getProductModule = h => post('/System/get_product_module', {}, h)
// 获取代理商資訊
export const getAgentPersonal = h => post('/System/get_agent_personal', {}, h)
// 专案注册
export const setApplyProject = (p, h) => post('/Project/apply_project', p, h)
// 我申请的專案
export const getMyProject = (p, h) => post('/Project/get_my_project', p, h)
// 獲取審核記錄
export const getAuditLogging = (p, h) => post('/Project/get_audit_logging', p, h)
// 专案详情
export const getProjectRead = (p, h) => post('/Project/project_read', p, h)
// 我审核的专案
export const myAuditProject = (p, h) => post('/Project/my_audit_project', p, h)
