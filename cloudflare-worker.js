// Cloudflare Worker - 阿拉伯语词库API
// 部署到: https://arabic-proxy.head-6c9.workers.dev/

// 完整词库数据（可以随时扩展）
const VOCABULARY = [
  { word: "مَرْحَبًا", ipa: "marħaban", zh: "你好", en: "hello", category: "问候" },
  { word: "شُكْرًا", ipa: "ʃukran", zh: "谢谢", en: "thank you", category: "问候" },
  { word: "سَلَام", ipa: "salæːm", zh: "和平/你好", en: "peace/hello", category: "问候" },
  { word: "بَيْت", ipa: "bajt", zh: "房子", en: "house", category: "建筑" },
  { word: "مَاء", ipa: "mæːʔ", zh: "水", en: "water", category: "饮料" },
  { word: "كِتَاب", ipa: "kitæːb", zh: "书", en: "book", category: "学习" },
  { word: "قَلَم", ipa: "qalam", zh: "笔", en: "pen", category: "学习" },
  { word: "مَدْرَسَة", ipa: "madrasa", zh: "学校", en: "school", category: "学习" },
  { word: "طَالِب", ipa: "tˤɑːlib", zh: "学生(男)", en: "student (male)", category: "学习" },
  { word: "طَالِبَة", ipa: "tˤɑːliba", zh: "学生(女)", en: "student (female)", category: "学习" },
  { word: "مُعَلِّم", ipa: "muʕallim", zh: "教师(男)", en: "teacher (male)", category: "职业" },
  { word: "طَبِيب", ipa: "tˤabiːb", zh: "医生", en: "doctor", category: "职业" },
  { word: "مُهَنْدِس", ipa: "muhændis", zh: "工程师", en: "engineer", category: "职业" },
  { word: "أَب", ipa: "ʔab", zh: "父亲", en: "father", category: "家庭" },
  { word: "أُم", ipa: "ʔumm", zh: "母亲", en: "mother", category: "家庭" },
  { word: "أَخ", ipa: "ʔax", zh: "兄弟", en: "brother", category: "家庭" },
  { word: "أُخْت", ipa: "ʔuxt", zh: "姐妹", en: "sister", category: "家庭" },
  { word: "صَدِيق", ipa: "sˤadiːq", zh: "朋友(男)", en: "friend (male)", category: "社交" },
  { word: "صَدِيقَة", ipa: "sˤadiːqa", zh: "朋友(女)", en: "friend (female)", category: "社交" },
  { word: "يَوْم", ipa: "jawm", zh: "天/日", en: "day", category: "时间" },
  { word: "لَيْلَة", ipa: "lajla", zh: "夜晚", en: "night", category: "时间" },
  { word: "سَاعَة", ipa: "sæːʕa", zh: "小时/钟表", en: "hour/clock", category: "时间" },
  { word: "شَمْس", ipa: "ʃams", zh: "太阳", en: "sun", category: "自然" },
  { word: "قَمَر", ipa: "qamar", zh: "月亮", en: "moon", category: "自然" },
  { word: "نَجْم", ipa: "naʤm", zh: "星星", en: "star", category: "自然" },
  { word: "سَمَاء", ipa: "samæːʔ", zh: "天空", en: "sky", category: "自然" },
  { word: "أَرْض", ipa: "ʔardˤ", zh: "地球/土地", en: "earth/land", category: "自然" },
  { word: "بَحْر", ipa: "baħr", zh: "海洋", en: "sea", category: "自然" },
  { word: "جَبَل", ipa: "ʤabal", zh: "山", en: "mountain", category: "自然" },
  { word: "شَجَرَة", ipa: "ʃaʤara", zh: "树", en: "tree", category: "自然" },
  { word: "زَهْرَة", ipa: "zahra", zh: "花", en: "flower", category: "自然" },
  { word: "طَعَام", ipa: "tˤaʕæːm", zh: "食物", en: "food", category: "饮食" },
  { word: "خُبْز", ipa: "xubz", zh: "面包", en: "bread", category: "饮食" },
  { word: "لَحْم", ipa: "laħm", zh: "肉", en: "meat", category: "饮食" },
  { word: "فَاكِهَة", ipa: "fækiha", zh: "水果", en: "fruit", category: "饮食" },
  { word: "خُضَار", ipa: "xudˤɑːr", zh: "蔬菜", en: "vegetables", category: "饮食" },
  { word: "حَلِيب", ipa: "ħaliːb", zh: "牛奶", en: "milk", category: "饮料" },
  { word: "شَاي", ipa: "ʃæːj", zh: "茶", en: "tea", category: "饮料" },
  { word: "قَهْوَة", ipa: "qahwa", zh: "咖啡", en: "coffee", category: "饮料" },
  { word: "عَصِير", ipa: "ʕasˤiːr", zh: "果汁", en: "juice", category: "饮料" },
  { word: "أَحْمَر", ipa: "ʔaħmar", zh: "红色", en: "red", category: "颜色" },
  { word: "أَزْرَق", ipa: "ʔazraq", zh: "蓝色", en: "blue", category: "颜色" },
  { word: "أَخْضَر", ipa: "ʔaxdˤar", zh: "绿色", en: "green", category: "颜色" },
  { word: "أَصْفَر", ipa: "ʔasˤfar", zh: "黄色", en: "yellow", category: "颜色" },
  { word: "أَبْيَض", ipa: "ʔabjadˤ", zh: "白色", en: "white", category: "颜色" },
  { word: "أَسْوَد", ipa: "ʔaswad", zh: "黑色", en: "black", category: "颜色" },
  { word: "وَاحِد", ipa: "wæːħid", zh: "一", en: "one", category: "数字" },
  { word: "اِثْنَان", ipa: "ɪθnæːn", zh: "二", en: "two", category: "数字" },
  { word: "ثَلَاثَة", ipa: "θalæːθa", zh: "三", en: "three", category: "数字" },
  { word: "أَرْبَعَة", ipa: "ʔarbaʕa", zh: "四", en: "four", category: "数字" },
  { word: "خَمْسَة", ipa: "xamsa", zh: "五", en: "five", category: "数字" },
  { word: "سِتَّة", ipa: "sitta", zh: "六", en: "six", category: "数字" },
  { word: "سَبْعَة", ipa: "sabʕa", zh: "七", en: "seven", category: "数字" },
  { word: "ثَمَانِيَة", ipa: "θamæːnija", zh: "八", en: "eight", category: "数字" },
  { word: "تِسْعَة", ipa: "tisʕa", zh: "九", en: "nine", category: "数字" },
  { word: "عَشَرَة", ipa: "ʕaʃara", zh: "十", en: "ten", category: "数字" },
  { word: "سَيَّارَة", ipa: "sajjæːra", zh: "汽车", en: "car", category: "交通" },
  { word: "حَافِلَة", ipa: "ħæːfila", zh: "公交车", en: "bus", category: "交通" },
  { word: "قِطَار", ipa: "qitˤɑːr", zh: "火车", en: "train", category: "交通" },
  { word: "طَائِرَة", ipa: "tˤɑːʔira", zh: "飞机", en: "airplane", category: "交通" },
  { word: "سَفِينَة", ipa: "safiːna", zh: "船", en: "ship", category: "交通" },
  { word: "دَرَّاجَة", ipa: "darrɑːʤa", zh: "自行车", en: "bicycle", category: "交通" },
  { word: "مَدِينَة", ipa: "madiːna", zh: "城市", en: "city", category: "地点" },
  { word: "قَرْيَة", ipa: "qarya", zh: "村庄", en: "village", category: "地点" },
  { word: "شَارِع", ipa: "ʃæːriʕ", zh: "街道", en: "street", category: "地点" },
  { word: "مَطَار", ipa: "matˤɑːr", zh: "机场", en: "airport", category: "地点" },
  { word: "فُنْدُق", ipa: "funduq", zh: "酒店", en: "hotel", category: "地点" },
  { word: "مَطْعَم", ipa: "matˤʕam", zh: "餐厅", en: "restaurant", category: "地点" },
  { word: "مَكْتَبَة", ipa: "maktaba", zh: "图书馆/书店", en: "library/bookstore", category: "地点" },
  { word: "مُسْتَشْفَى", ipa: "mustʃafæ", zh: "医院", en: "hospital", category: "地点" },
  { word: "جَامِعَة", ipa: "ʤæːmiʕa", zh: "大学", en: "university", category: "学习" },
  { word: "مَسْجِد", ipa: "masʤid", zh: "清真寺", en: "mosque", category: "地点" },
  { word: "كَبِير", ipa: "kabiːr", zh: "大的", en: "big", category: "形容词" },
  { word: "صَغِير", ipa: "sˤaɣiːr", zh: "小的", en: "small", category: "形容词" },
  { word: "جَمِيل", ipa: "ʤamiːl", zh: "美丽的", en: "beautiful", category: "形容词" },
  { word: "قَبِيح", ipa: "qabiːħ", zh: "丑陋的", en: "ugly", category: "形容词" },
  { word: "جَدِيد", ipa: "ʤadiːd", zh: "新的", en: "new", category: "形容词" },
  { word: "قَدِيم", ipa: "qadiːm", zh: "旧的", en: "old", category: "形容词" },
  { word: "سَرِيع", ipa: "sariːʕ", zh: "快的", en: "fast", category: "形容词" },
  { word: "بَطِيء", ipa: "batˤiːʔ", zh: "慢的", en: "slow", category: "形容词" },
  { word: "سَهْل", ipa: "sahl", zh: "容易的", en: "easy", category: "形容词" },
  { word: "صَعْب", ipa: "sˤaʕb", zh: "困难的", en: "difficult", category: "形容词" },
  { word: "طَوِيل", ipa: "tˤawiːl", zh: "长的/高的", en: "long/tall", category: "形容词" },
  { word: "قَصِير", ipa: "qasˤiːr", zh: "短的/矮的", en: "short", category: "形容词" },
  { word: "نَظِيف", ipa: "nadˤiːf", zh: "干净的", en: "clean", category: "形容词" },
  { word: "وَسِخ", ipa: "wasix", zh: "脏的", en: "dirty", category: "形容词" },
  { word: "حَار", ipa: "ħɑːrr", zh: "热的", en: "hot", category: "形容词" },
  { word: "بَارِد", ipa: "bæːrid", zh: "冷的", en: "cold", category: "形容词" },
  { word: "كَتَبَ", ipa: "kataba", zh: "写(他)", en: "he wrote", category: "动词" },
  { word: "قَرَأَ", ipa: "qaraʔa", zh: "读(他)", en: "he read", category: "动词" },
  { word: "ذَهَبَ", ipa: "ðahaba", zh: "去(他)", en: "he went", category: "动词" },
  { word: "جَاءَ", ipa: "ʤæːʔa", zh: "来(他)", en: "he came", category: "动词" },
  { word: "أَكَلَ", ipa: "ʔakala", zh: "吃(他)", en: "he ate", category: "动词" },
  { word: "شَرِبَ", ipa: "ʃariba", zh: "喝(他)", en: "he drank", category: "动词" },
  { word: "نَامَ", ipa: "næːma", zh: "睡(他)", en: "he slept", category: "动词" },
  { word: "عَمِلَ", ipa: "ʕamila", zh: "工作(他)", en: "he worked", category: "动词" },
  { word: "دَرَسَ", ipa: "darasa", zh: "学习(他)", en: "he studied", category: "动词" },
  { word: "فَهِمَ", ipa: "fahima", zh: "理解(他)", en: "he understood", category: "动词" },
  { word: "تَكَلَّمَ", ipa: "takallama", zh: "说话(他)", en: "he spoke", category: "动词" },
  { word: "سَمِعَ", ipa: "samiʕa", zh: "听(他)", en: "he heard", category: "动词" },
  { word: "رَأَى", ipa: "raʔæː", zh: "看见(他)", en: "he saw", category: "动词" },
  { word: "فَتَحَ", ipa: "fataħa", zh: "打开(他)", en: "he opened", category: "动词" },
  { word: "أَغْلَقَ", ipa: "ʔaɣlaqa", zh: "关闭(he)", en: "he closed", category: "动词" },
  { word: "حُبّ", ipa: "ħubb", zh: "爱", en: "love", category: "情感" },
  { word: "سَعَادَة", ipa: "saʕæːda", zh: "幸福", en: "happiness", category: "情感" },
  { word: "حُزْن", ipa: "ħuzn", zh: "悲伤", en: "sadness", category: "情感" },
  { word: "خَوْف", ipa: "xawf", zh: "恐惧", en: "fear", category: "情感" },
  { word: "غَضَب", ipa: "ɣadˤab", zh: "愤怒", en: "anger", category: "情感" },
  { word: "لُغَة", ipa: "luɣa", zh: "语言", en: "language", category: "学习" },
  { word: "عَرَبِيّ", ipa: "ʕarabijj", zh: "阿拉伯的/阿拉伯语", en: "Arabic", category: "学习" },
  { word: "إِنْجِلِيزِيّ", ipa: "ʔinʤiliːzijj", zh: "英语的/英语", en: "English", category: "学习" },
  { word: "صِينِيّ", ipa: "sˤiːnijj", zh: "中国的/中文", en: "Chinese", category: "学习" },
  { word: "بَلَد", ipa: "balad", zh: "国家", en: "country", category: "地理" },
  { word: "عَالَم", ipa: "ʕæːlam", zh: "世界", en: "world", category: "地理" },
  { word: "شَرْق", ipa: "ʃarq", zh: "东方", en: "east", category: "方向" },
  { word: "غَرْب", ipa: "ɣarb", zh: "西方", en: "west", category: "方向" },
  { word: "شَمَال", ipa: "ʃamæːl", zh: "北方", en: "north", category: "方向" },
  { word: "جَنُوب", ipa: "ʤanuːb", zh: "南方", en: "south", category: "方向" },
  { word: "يَمِين", ipa: "jamiːn", zh: "右边", en: "right", category: "方向" },
  { word: "يَسَار", ipa: "jasæːr", zh: "左边", en: "left", category: "方向" },
  { word: "فَوْق", ipa: "fawq", zh: "上面", en: "above", category: "方向" },
  { word: "تَحْت", ipa: "taħt", zh: "下面", en: "below", category: "方向" },
  { word: "نَعَم", ipa: "naʕam", zh: "是/对", en: "yes", category: "常用词" },
  { word: "لَا", ipa: "læː", zh: "不/否", en: "no", category: "常用词" },
  { word: "مِن فَضْلِك", ipa: "min fadˤlik", zh: "请", en: "please", category: "礼貌用语" },
  { word: "عَفْوًا", ipa: "ʕafwan", zh: "不客气/对不起", en: "you're welcome/sorry", category: "礼貌用语" },
  { word: "آسِف", ipa: "ʔæːsif", zh: "抱歉的", en: "sorry", category: "礼貌用语" },
  { word: "مَعَ السَّلَامَة", ipa: "maʕa s-salæːma", zh: "再见", en: "goodbye", category: "问候" }
];

// 处理CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    // 处理 OPTIONS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 只接受 POST 请求
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: '仅支持 POST 请求' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // 解析请求体
      const body = await request.json();
      const shownWords = body.shownWords || [];

      // 过滤出未显示的单词
      const availableWords = VOCABULARY.filter(word => !shownWords.includes(word.word));

      // 如果没有可用单词，返回错误
      if (availableWords.length === 0) {
        return new Response(JSON.stringify({
          error: '词库已全部学习完成',
          totalWords: VOCABULARY.length,
          learnedWords: shownWords.length
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // 随机选择一个单词
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      const selectedWord = availableWords[randomIndex];

      // 返回选中的单词
      return new Response(JSON.stringify({
        ...selectedWord,
        meta: {
          totalWords: VOCABULARY.length,
          learnedWords: shownWords.length,
          remainingWords: availableWords.length
        }
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        error: '服务器错误',
        message: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
