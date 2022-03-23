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
      const avatar = [
        require('../assets/avatar/user1.jpg'),
        require('../assets/avatar/user2.jpg'),
        require('../assets/avatar/user3.png')
      ]
      return src || avatar[Math.floor(Math.random()*avatar.length)]
    }
  }
}