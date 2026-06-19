/**
 * assets/content-map.js
 * 站点内容分区与关键词标签配置，提供搜索过滤功能。
 * 用于 https://index-app-i-game.com.cn 爱游戏相关内容的组织与检索。
 */

const contentMap = {
  siteUrl: "https://index-app-i-game.com.cn",
  siteName: "爱游戏",
  sections: [
    {
      id: "home",
      title: "首页",
      tags: ["爱游戏", "导航", "推荐"],
      keywords: ["游戏大厅", "热门推荐", "每日精选"],
      content: "欢迎来到爱游戏，发现更多精彩游戏内容。"
    },
    {
      id: "category",
      title: "分类浏览",
      tags: ["爱游戏", "分类", "类型"],
      keywords: ["动作", "冒险", "休闲", "策略", "模拟", "体育"],
      content: "按游戏类型浏览，找到你最爱的游戏类别。"
    },
    {
      id: "ranking",
      title: "排行榜",
      tags: ["爱游戏", "排行", "热门"],
      keywords: ["周榜", "月榜", "总榜", "人气", "评分"],
      content: "查看最新游戏排行，了解热门趋势。"
    },
    {
      id: "detail",
      title: "游戏详情",
      tags: ["爱游戏", "详情", "介绍"],
      keywords: ["说明", "截图", "评价", "下载", "攻略"],
      content: "查看游戏详细介绍、截图与用户评价。"
    },
    {
      id: "search",
      title: "搜索",
      tags: ["爱游戏", "搜索", "查找"],
      keywords: ["关键词", "过滤", "结果"],
      content: "通过关键词快速搜索游戏内容。"
    }
  ]
};

/**
 * 根据关键词搜索匹配的分区
 * @param {string} query - 搜索关键词
 * @returns {Array} 匹配的分区对象数组
 */
function searchSections(query) {
  if (!query || typeof query !== "string") {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  for (const section of contentMap.sections) {
    const matchFields = [
      section.title,
      ...section.tags,
      ...section.keywords,
      section.content
    ];

    const isMatch = matchFields.some(field =>
      field.toLowerCase().includes(lowerQuery)
    );

    if (isMatch) {
      results.push({
        id: section.id,
        title: section.title,
        matchReason: `匹配关键词: "${query}"`
      });
    }
  }

  return results;
}

/**
 * 根据标签过滤分区
 * @param {string} tag - 要过滤的标签
 * @returns {Array} 包含指定标签的分区列表
 */
function filterByTag(tag) {
  if (!tag || typeof tag !== "string") {
    return [];
  }

  return contentMap.sections
    .filter(section =>
      section.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    )
    .map(section => ({
      id: section.id,
      title: section.title
    }));
}

/**
 * 获取所有分区 ID 列表
 * @returns {string[]}
 */
function getAllSectionIds() {
  return contentMap.sections.map(s => s.id);
}

/**
 * 根据分区 ID 获取完整内容
 * @param {string} id
 * @returns {object|null}
 */
function getSectionById(id) {
  return contentMap.sections.find(s => s.id === id) || null;
}

// 示例使用（仅用于演示，不自动执行）
/*
console.log(searchSections("爱游戏"));
console.log(filterByTag("排行"));
console.log(getSectionById("detail"));
*/

// 导出（适用于浏览器或模块环境）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentMap,
    searchSections,
    filterByTag,
    getAllSectionIds,
    getSectionById
  };
}