// ./src/views/RestaurantsFeeds.vue
<template>
  <div class="container py-5">
    <!-- 使用 NavTabs 元件 -->
    <NavTabs />
    <h1 class="mt-5">最新動態</h1>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <!-- 最新評論 NewestComments-->
        <h3>最新評論</h3>
        <NewestComments :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script>
const dummyData = {
  restaurants: [
    {
      id: 1,
      name: "Sylvester Hauck",
      tel: "(813) 367-7905",
      address: "1690 Turner Well",
      opening_hours: "08:00",
      description:
        "Quam autem accusamus eos laboriosam.\nCorporis rerum voluptatibus dolores facere nihil.\nEveniet ut debitis fuga praesentium.\nConsequuntur voluptate non hic similique vero dolor quia saepe.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=57.31300539537876",
      viewCounts: 1,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-26T23:39:20.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 2,
      name: "Ms. Daisy Lowe",
      tel: "757-985-2239 x557",
      address: "94611 Legros Street",
      opening_hours: "08:00",
      description: "aut sunt totam",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=32.748984211089",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 3,
      name: "Fausto Schultz",
      tel: "(828) 973-9305 x76105",
      address: "719 Mayert Tunnel",
      opening_hours: "08:00",
      description:
        "Fugit blanditiis quia aspernatur eos at possimus veniam. Magnam quod voluptatibus aut amet praesentium non impedit voluptatem quas. Id eum voluptas quasi deserunt doloribus. Nesciunt sunt nulla dolor illo totam commodi omnis aut.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=33.706516124447546",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 4,
      name: "Vickie Heller",
      tel: "296.006.0097",
      address: "06757 Powlowski Ways",
      opening_hours: "08:00",
      description:
        "Sapiente fugiat esse eos nemo nesciunt earum. Repudiandae quis voluptas optio. Delectus expedita ex voluptatem voluptas exercitationem et. Necessitatibus quos consequatur voluptate voluptatibus architecto qui aut tenetur.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=89.56567944747414",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 5,
      name: "Angie Breitenberg",
      tel: "358-310-1839 x887",
      address: "48693 Kilback View",
      opening_hours: "08:00",
      description: "eum",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=26.857058197885753",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 6,
      name: "Mrs. Tatum Sanford",
      tel: "157-267-1571 x935",
      address: "581 Judah Union",
      opening_hours: "08:00",
      description:
        "Animi rerum vitae.\nLaboriosam impedit et quis nobis quia.\nNihil molestias porro quia voluptatem.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=95.40942893654156",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 7,
      name: "Vladimir Kihn",
      tel: "406-315-9660",
      address: "5043 Cary Crescent",
      opening_hours: "08:00",
      description:
        "Blanditiis sequi ea laborum hic. Accusamus officia hic perferendis perferendis blanditiis vel minima deserunt. Nesciunt et qui vel aut asperiores itaque dicta explicabo quibusdam. In totam atque ipsum mollitia non eos voluptatem dolor necessitatibus.\n \rSunt id dolorem sed quis repellat sit laudantium rem. Rem tempore sapiente corrupti sequi voluptate occaecati dolores. Iure ipsa sit et ipsum ipsa maiores. Cumque explicabo facere hic esse.\n \rAut qui quis modi est iste. Nobis dolor vero eum totam voluptatibus voluptatem molestias magni illo. Aut eveniet laborum autem eveniet. Odit est alias et quia et.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=71.37537519668544",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 8,
      name: "Reece Roberts DDS",
      tel: "885-527-5377 x46555",
      address: "98359 Ashlynn Hills",
      opening_hours: "08:00",
      description:
        "Dolor doloremque explicabo illum suscipit nesciunt aut dolores. Ratione qui laborum sint laborum suscipit blanditiis. Cupiditate maxime hic commodi placeat numquam quia molestias itaque eaque.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=84.80575162646599",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 9,
      name: "Norma White",
      tel: "836.195.0729 x7509",
      address: "0314 Genevieve Place",
      opening_hours: "08:00",
      description:
        "Corrupti soluta reiciendis est. Suscipit velit recusandae est nesciunt delectus ipsum. Adipisci repudiandae adipisci adipisci adipisci id nesciunt eaque. Nihil fuga perferendis adipisci tempora sunt possimus.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=3.1766814872193905",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 10,
      name: "Green Marquardt",
      tel: "779.692.8187 x0619",
      address: "65962 Izabella Mission",
      opening_hours: "08:00",
      description: "itaque",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=73.67512243532543",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
  ],
  comments: [
    {
      id: 7,
      text: "Ab laboriosam et libero ut et sapiente est voluptatem autem.",
      UserId: 1,
      RestaurantId: 7,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      User: {
        id: 1,
        name: "root",
        email: "root@example.com",
        password:
          "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
        isAdmin: true,
        image: null,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      Restaurant: {
        id: 7,
        name: "Vladimir Kihn",
        tel: "406-315-9660",
        address: "5043 Cary Crescent",
        opening_hours: "08:00",
        description:
          "Blanditiis sequi ea laborum hic. Accusamus officia hic perferendis perferendis blanditiis vel minima deserunt. Nesciunt et qui vel aut asperiores itaque dicta explicabo quibusdam. In totam atque ipsum mollitia non eos voluptatem dolor necessitatibus.\n \rSunt id dolorem sed quis repellat sit laudantium rem. Rem tempore sapiente corrupti sequi voluptate occaecati dolores. Iure ipsa sit et ipsum ipsa maiores. Cumque explicabo facere hic esse.\n \rAut qui quis modi est iste. Nobis dolor vero eum totam voluptatibus voluptatem molestias magni illo. Aut eveniet laborum autem eveniet. Odit est alias et quia et.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=71.37537519668544",
        viewCounts: 0,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        CategoryId: 3,
      },
    },
    {
      id: 33,
      text: "Tenetur quo sunt nesciunt harum quis a dolore ut molestiae.",
      UserId: 1,
      RestaurantId: 33,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      User: {
        id: 1,
        name: "root",
        email: "root@example.com",
        password:
          "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
        isAdmin: true,
        image: null,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      Restaurant: {
        id: 33,
        name: "Monique Armstrong",
        tel: "1-924-310-1675",
        address: "643 Aurelia Mountain",
        opening_hours: "08:00",
        description:
          "Saepe numquam officiis alias quos explicabo tempora fugit et qui. In eius repudiandae a voluptate est libero eos cupiditate. Dolorem tempora est esse vel voluptates est qui quia. Necessitatibus eum aut aut ut voluptatem debitis voluptatum. Est fugit iste. Ad nam repellendus atque architecto asperiores.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=65.05048881066836",
        viewCounts: 0,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        CategoryId: 3,
      },
    },
    {
      id: 60,
      text: "Sint unde asperiores ipsam est dolore.",
      UserId: 1,
      RestaurantId: 10,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      User: {
        id: 1,
        name: "root",
        email: "root@example.com",
        password:
          "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
        isAdmin: true,
        image: null,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      Restaurant: {
        id: 10,
        name: "Green Marquardt",
        tel: "779.692.8187 x0619",
        address: "65962 Izabella Mission",
        opening_hours: "08:00",
        description: "itaque",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=73.67512243532543",
        viewCounts: 0,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        CategoryId: 2,
      },
    },
    {
      id: 81,
      text: "Ut aliquid est libero et facere vitae omnis et.",
      UserId: 1,
      RestaurantId: 31,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      User: {
        id: 1,
        name: "root",
        email: "root@example.com",
        password:
          "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
        isAdmin: true,
        image: null,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      Restaurant: {
        id: 31,
        name: "Marcos Mertz",
        tel: "269-766-3877 x285",
        address: "0701 Beahan Field",
        opening_hours: "08:00",
        description:
          "Modi aspernatur harum sunt ut ut voluptatem et fugit mollitia.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=20.905375712322982",
        viewCounts: 0,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        CategoryId: 5,
      },
    },
    {
      id: 98,
      text: "Nam qui aut laboriosam earum impedit et ex minima possimus.",
      UserId: 1,
      RestaurantId: 48,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      User: {
        id: 1,
        name: "root",
        email: "root@example.com",
        password:
          "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
        isAdmin: true,
        image: null,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      Restaurant: {
        id: 48,
        name: "Avery Weissnat",
        tel: "692-031-1856 x56866",
        address: "03535 Ruby Port",
        opening_hours: "08:00",
        description:
          "Corrupti et dolores ratione. Fuga accusantium et. Aut sed cum. Explicabo repudiandae quo aut dolor inventore in porro. In laborum eligendi asperiores soluta. Sit necessitatibus neque repudiandae quia.\n \rLaboriosam ex eum eum sed et ut exercitationem. Tempore soluta voluptas deserunt aut. Voluptatibus ex atque temporibus qui non provident rerum aliquid. Quibusdam aut ipsum.\n \rConsequatur velit sed ipsa omnis numquam quia nihil praesentium facilis. Vel aut neque repudiandae non aperiam soluta repellendus excepturi. Eligendi vero voluptate ratione.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=63.73601442766341",
        viewCounts: 0,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        CategoryId: 1,
      },
    },
    {
      id: 123,
      text: "Error labore minima commodi omnis nihil.",
      UserId: 1,
      RestaurantId: 23,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      User: {
        id: 1,
        name: "root",
        email: "root@example.com",
        password:
          "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
        isAdmin: true,
        image: null,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      Restaurant: {
        id: 23,
        name: "Johnathon Murphy",
        tel: "650.861.6571",
        address: "2072 Frederik Mount",
        opening_hours: "08:00",
        description: "earum reprehenderit ipsa",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=36.52917163256242",
        viewCounts: 0,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        CategoryId: 1,
      },
    },
    {
      id: 141,
      text: "Consequuntur qui libero optio harum aut.",
      UserId: 1,
      RestaurantId: 41,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      User: {
        id: 1,
        name: "root",
        email: "root@example.com",
        password:
          "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
        isAdmin: true,
        image: null,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      Restaurant: {
        id: 41,
        name: "Quinten Carroll DVM",
        tel: "1-880-877-7492 x6234",
        address: "736 Victor Way",
        opening_hours: "08:00",
        description: "fugiat",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=19.42024888772249",
        viewCounts: 0,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        CategoryId: 3,
      },
    },
    {
      id: 20,
      text: "Eum at ullam ut tenetur.",
      UserId: 2,
      RestaurantId: 20,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      User: {
        id: 2,
        name: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Qm5VdQxvP1RW.FwtkSx3Je1dThQIrZmMld2Hr2YwetRIXvESBr70q",
        isAdmin: false,
        image: null,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      Restaurant: {
        id: 20,
        name: "Anissa Kihn",
        tel: "(325) 162-9930",
        address: "4813 Smith Plain",
        opening_hours: "08:00",
        description:
          "Numquam veniam numquam distinctio fugit est harum non laborum. Ut aliquam possimus repellat fugit ut non neque. Qui voluptate labore sit voluptatum at rem. Iste ut est odio non numquam quo. Quia occaecati dolorem dolore error voluptatibus et debitis dolorem earum. Officiis nihil consequatur rerum unde quo nostrum.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=53.9293943293242",
        viewCounts: 0,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        CategoryId: 3,
      },
    },
    {
      id: 34,
      text: "Occaecati tempora possimus quia.",
      UserId: 2,
      RestaurantId: 34,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      User: {
        id: 2,
        name: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Qm5VdQxvP1RW.FwtkSx3Je1dThQIrZmMld2Hr2YwetRIXvESBr70q",
        isAdmin: false,
        image: null,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      Restaurant: {
        id: 34,
        name: "Michale Schimmel",
        tel: "738-371-3089 x727",
        address: "25018 Ardella Landing",
        opening_hours: "08:00",
        description: "ut ut quod",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=63.89137019245881",
        viewCounts: 0,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        CategoryId: 4,
      },
    },
    {
      id: 46,
      text: "Et qui quia voluptatem ea qui sit.",
      UserId: 2,
      RestaurantId: 46,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      User: {
        id: 2,
        name: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Qm5VdQxvP1RW.FwtkSx3Je1dThQIrZmMld2Hr2YwetRIXvESBr70q",
        isAdmin: false,
        image: null,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      Restaurant: {
        id: 46,
        name: "Ryann Rippin",
        tel: "1-020-874-8995 x0712",
        address: "0938 Pagac Corner",
        opening_hours: "08:00",
        description: "velit perspiciatis est",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=68.43301504377366",
        viewCounts: 0,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        CategoryId: 5,
      },
    },
  ],
};

import NavTabs from "./../components/NavTabs.vue";
import NewestRestaurants from "./../components/NewestRestaurants";
import NewestComments from "./../components/NewestComments";

export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    fetchFeeds() {
      this.restaurants = dummyData.restaurants;
      this.comments = dummyData.comments.filter(
        (comment) => comment.Restaurant && comment.text
      );
    },
  },
};
</script>