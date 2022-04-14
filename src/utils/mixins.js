// ./src/utils/mixins.js
import moment from 'moment'

// 時間轉換
export const fromNowFilter = {
  filters: {
    fromNow (datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}

// 無頭像就隨機放假照片
export const emptyImageFilter = {
  filters: {
    emptyImage (src) {
      const randomImg = [
        require('../assets/avatar/avatar-1.jpg'),
        require('../assets/avatar/avatar-2.jpg'),
        require('../assets/avatar/avatar-3.jpg'),
        require('../assets/avatar/avatar-4.jpg'),
        require('../assets/avatar/avatar-5.jpg'),
        require('../assets/avatar/avatar-6.jpg'),
        require('../assets/avatar/avatar-7.jpg'),
        require('../assets/avatar/avatar-8.jpg'),
      ]
      return src || randomImg[Math.floor(Math.random() * randomImg.length)]
    }
  }
}