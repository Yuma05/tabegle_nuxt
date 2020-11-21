<template>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col cols="11" md="5" class="pb-0">
        <search-place @changePlace="setPlace"></search-place
      ></v-col>
      <v-col cols="11" md="5" class="pb-0">
        <search-category @changeCategory="setCategory"></search-category
      ></v-col>
      <v-col cols="auto">
        <v-btn outlined rounded color="orange" @click="searchShop"
          ><v-icon>mdi-magnify</v-icon>検索</v-btn
        >
      </v-col>
    </v-row>

    <shop-card :shops="shops"></shop-card>

    <v-card>
      <v-card-text>{{ place }}</v-card-text>
      <v-card-text>{{ category }}</v-card-text>
      <v-card-text>{{ shops }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import SearchPlace from '@/components/SearchPlace'
import SearchCategory from '@/components/SearchCategory'
import ShopCard from '@/components/ShopCard'

export default {
  components: { ShopCard, SearchCategory, SearchPlace },
  data() {
    return {
      test: 0,
      place: '',
      category: '',
      isLoading: false,
      shops: [
        {
          id: 414,
          name: 'とり喜',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/64716/320x320_square_64716370.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13026017/',
          address: '日本、〒130-0013 東京都墨田区錦糸１丁目８−１３ 小坂ビル',
          tabelog_rating: 4.16,
          tabelog_review_num: 468,
          google_rating: 4,
          google_review_num: 242,
          total_rating: 4,
        },
        {
          id: 415,
          name: 'サウスラボ 南方',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/128274/320x320_square_128274930.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13235226/',
          address:
            '日本、〒130-0013 東京都墨田区錦糸３丁目７−３ オフィスナカジマビル 1F',
          tabelog_rating: 3.83,
          tabelog_review_num: 52,
          google_rating: 4.3,
          google_review_num: 38,
          total_rating: 4,
        },
        {
          id: 416,
          name: '中華そば 満鶏軒',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/117573/320x320_square_117573938.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13220773/',
          address: '日本、〒130-0022 東京都墨田区江東橋２丁目５−３',
          tabelog_rating: 3.82,
          tabelog_review_num: 441,
          google_rating: 4.1,
          google_review_num: 551,
          total_rating: 4,
        },
        {
          id: 417,
          name: 'アジアカレーハウス',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/48687/320x320_square_48687124.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13168072/',
          address: '日本、〒130-0022 東京都墨田区江東橋３丁目９−２４',
          tabelog_rating: 3.8,
          tabelog_review_num: 249,
          google_rating: 4.2,
          google_review_num: 198,
          total_rating: 4,
        },
        {
          id: 418,
          name: '中国酒家 大三元',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/85429/320x320_square_85429276.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13007985/',
          address: '日本、〒130-0012 東京都墨田区太平３丁目４−１',
          tabelog_rating: 3.77,
          tabelog_review_num: 296,
          google_rating: 4.3,
          google_review_num: 289,
          total_rating: 4,
        },
        {
          id: 419,
          name: '北斎茶房',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/93684/320x320_square_93684310.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13009563/',
          address: '日本、〒130-0014 東京都墨田区亀沢４丁目８−５',
          tabelog_rating: 3.75,
          tabelog_review_num: 394,
          google_rating: 4.2,
          google_review_num: 345,
          total_rating: 4,
        },
        {
          id: 420,
          name: '真鯛らーめん 麺魚 本店',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/72613/320x320_square_72613579.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13208237/',
          address:
            '日本、〒130-0022 東京都墨田区江東橋２丁目８−８ パークサイドマンション',
          tabelog_rating: 3.74,
          tabelog_review_num: 621,
          google_rating: 4,
          google_review_num: 1760,
          total_rating: 4,
        },
        {
          id: 421,
          name: '佐市',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/65323/320x320_square_65323962.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13147184/',
          address: '日本、〒130-0013 東京都墨田区錦糸４丁目６−９',
          tabelog_rating: 3.73,
          tabelog_review_num: 455,
          google_rating: 3.9,
          google_review_num: 900,
          total_rating: 4,
        },
        {
          id: 422,
          name: 'ヴェヌス サウス インディアン ダイニング 錦糸町店',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/56175/320x320_square_56175936.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13183010/',
          address: '日本、〒130-0013 東京都墨田区錦糸２丁目６−１１',
          tabelog_rating: 3.72,
          tabelog_review_num: 341,
          google_rating: 4,
          google_review_num: 383,
          total_rating: 4,
        },
        {
          id: 423,
          name: 'すみだ珈琲',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/62078/320x320_square_62078426.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13120781/',
          address: '日本、〒130-0012 東京都墨田区太平４丁目７−１１',
          tabelog_rating: 3.68,
          tabelog_review_num: 156,
          google_rating: 4.3,
          google_review_num: 193,
          total_rating: 4,
        },
        {
          id: 424,
          name: '鮨 なかがわ',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/46811/320x320_square_46811801.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13179883/',
          address: '日本、〒130-0012 東京都墨田区太平１丁目２２−１',
          tabelog_rating: 3.68,
          tabelog_review_num: 62,
          google_rating: 4.1,
          google_review_num: 42,
          total_rating: 4,
        },
        {
          id: 425,
          name: '菜苑',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/12993/320x320_square_12993264.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13018014/',
          address: '日本、〒136-0071 東京都江東区亀戸３丁目１−８',
          tabelog_rating: 3.67,
          tabelog_review_num: 313,
          google_rating: 4.1,
          google_review_num: 867,
          total_rating: 4,
        },
        {
          id: 426,
          name: 'くり家',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/119407/320x320_square_119407214.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13041484/',
          address: '日本、〒130-0013 東京都墨田区錦糸１丁目１２−２',
          tabelog_rating: 3.67,
          tabelog_review_num: 158,
          google_rating: 4.1,
          google_review_num: 145,
          total_rating: 4,
        },
        {
          id: 427,
          name: '純手打ち讃岐うどん五郎',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/19062/320x320_square_19062288.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13156107/',
          address: '日本、〒130-0022 東京都墨田区江東橋１丁目１３−１',
          tabelog_rating: 3.66,
          tabelog_review_num: 298,
          google_rating: 4.4,
          google_review_num: 341,
          total_rating: 4,
        },
        {
          id: 428,
          name: '麺屋りゅう',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/139856/320x320_square_139856599.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13176590/',
          address: '日本、〒130-0012 東京都墨田区太平３丁目１２−３',
          tabelog_rating: 3.66,
          tabelog_review_num: 128,
          google_rating: 3.8,
          google_review_num: 157,
          total_rating: 4,
        },
        {
          id: 429,
          name: '八べえ',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/43216/320x320_square_43216276.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131202/13056800/',
          address: '日本、〒136-0071 東京都江東区亀戸３丁目２−８',
          tabelog_rating: 3.66,
          tabelog_review_num: 101,
          google_rating: 3.7,
          google_review_num: 154,
          total_rating: 4,
        },
        {
          id: 430,
          name: 'サイゴンマジェスティック',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/136270/320x320_square_136270518.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13005061/',
          address:
            '日本、〒130-0013 東京都墨田区錦糸３丁目３−９ イーストビル錦糸町 4F',
          tabelog_rating: 3.65,
          tabelog_review_num: 188,
          google_rating: 4,
          google_review_num: 242,
          total_rating: 4,
        },
        {
          id: 431,
          name: '麺屋 中川會 住吉店',
          img_src:
            'https://tblg.k-img.com/restaurant/images/Rvw/64060/320x320_square_64060477.jpg',
          url: 'https://tabelog.com/tokyo/A1312/A131201/13205611/',
          address: '日本、〒135-0002 東京都江東区住吉１丁目１９−１',
          tabelog_rating: 3.65,
          tabelog_review_num: 115,
          google_rating: 3.8,
          google_review_num: 270,
          total_rating: 4,
        },
      ],
    }
  },
  methods: {
    // async searchPlace() {
    //   this.places = await this.$searchPlace()
    //   return this.places
    // },
    setPlace(place) {
      this.place = place
    },
    setCategory(category) {
      this.category = category
    },
    async searchShop() {
      this.isLoading = true
      const searchQuery = new URLSearchParams()
      if (this.place) searchQuery.set('place', this.place)
      if (this.category) searchQuery.set('category', this.category)
      await axios
        .get('/api/search/shop?' + searchQuery.toString())
        .then((res) => (this.shops = res.data))
        .catch((error) => console.log(error))
        .finally(() => (this.isLoading = false))
    },
  },
}
</script>
