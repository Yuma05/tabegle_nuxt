<template>
  <div class="star-rating">
    <div v-for="(star, index) in stars" :key="index" class="star-container">
      <svg
        class="star-svg"
        :style="[
          { fill: `url(#gradient${star.raw})` },
          { width: starSize },
          { height: starSize },
        ]"
      >
        <polygon :points="getStarPoints" style="fill-rule: nonzero" />
        <defs>
          <!--
            id has to be unique to each star fullness(dynamic offset) - it indicates fullness above
          -->
          <linearGradient :id="`gradient${star.raw}`">
            <stop
              id="stop1"
              :offset="star.percent"
              stop-opacity="1"
              :stop-color="getFullFillColor(star)"
            ></stop>
            <stop
              id="stop2"
              :offset="star.percent"
              stop-opacity="0"
              :stop-color="getFullFillColor(star)"
            ></stop>
            <stop
              id="stop3"
              :offset="star.percent"
              stop-opacity="1"
              :stop-color="styleEmptyStarColor"
            ></stop>
            <stop
              id="stop4"
              offset="100%"
              stop-opacity="1"
              :stop-color="styleEmptyStarColor"
            ></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div v-if="isIndicatorActive" class="indicator ml-1">
      <span class="font-weight-bold" style="color: #e10001">{{ rating }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarsRating',
  props: {
    rating: {
      type: Number,
      default: 4.0,
    },
    starSize: {
      type: Number,
      default: 25,
    },
    isIndicatorActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      stars: [],
      emptyStar: 0,
      fullStar: 1,
      totalStars: 5,
      styleEmptyStarColor: '#E1E1E1',
      styleFullStarColor: '#FF6A00',
    }
  },
  computed: {
    getStarPoints() {
      const centerX = this.starSize / 2
      const centerY = this.starSize / 2

      const innerCircleArms = 5 // a 5 arms star

      const innerRadius = this.starSize / innerCircleArms
      const innerOuterRadiusRatio = 2.5 // Unique value - determines fatness/sharpness of star
      const outerRadius = innerRadius * innerOuterRadiusRatio

      return this.calcStarPoints(
        centerX,
        centerY,
        innerCircleArms,
        innerRadius,
        outerRadius
      )
    },
  },
  created() {
    this.initStars()
    this.setStars()
  },
  methods: {
    calcStarPoints(
      centerX,
      centerY,
      innerCircleArms,
      innerRadius,
      outerRadius
    ) {
      const angle = Math.PI / innerCircleArms
      const angleOffsetToCenterStar = 60

      const totalArms = innerCircleArms * 2
      let points = ''
      for (let i = 0; i < totalArms; i++) {
        const isEvenIndex = i % 2 === 0
        const r = isEvenIndex ? outerRadius : innerRadius
        const currX =
          centerX + Math.cos(i * angle + angleOffsetToCenterStar) * r
        const currY =
          centerY + Math.sin(i * angle + angleOffsetToCenterStar) * r
        points += currX + ',' + currY + ' '
      }
      return points
    },
    initStars() {
      for (let i = 0; i < this.totalStars; i++) {
        this.stars.push({
          raw: this.emptyStar,
          percent: this.emptyStar + '%',
        })
      }
    },
    setStars() {
      let fullStarsCounter = Math.floor(this.rating)
      for (let i = 0; i < this.stars.length; i++) {
        if (fullStarsCounter !== 0) {
          this.stars[i].raw = this.fullStar
          this.stars[i].percent = this.calcStarFullness(this.stars[i])
          fullStarsCounter--
        } else {
          const surplus = Math.round((this.rating % 1) * 10) / 10 // Support just one decimal
          const roundedOneDecimalPoint = Math.round(surplus * 10) / 10
          this.stars[i].raw = roundedOneDecimalPoint
          return (this.stars[i].percent = this.calcStarFullness(this.stars[i]))
        }
      }
    },
    getFullFillColor(starData) {
      return starData.raw !== this.emptyStar
        ? this.styleFullStarColor
        : this.styleEmptyStarColor
    },
    calcStarFullness(starData) {
      const starFullnessPercent = starData.raw * 100 + '%'
      return starFullnessPercent
    },
  },
}
</script>

<style scoped lang="scss">
.star-rating {
  display: flex;
  align-items: center;

  .star-container {
    display: flex;

    .star-svg {
    }
  }

  .indicator {
  }

  .star-container:not(:last-child) {
    //margin-right: 5px;
  }
}
</style>
