// ./src/components/AdminRestaurantsTable.vue
<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : "未分類" }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }"
            class="btn btn-link"
            >Show</router-link
          >

          <router-link  
          :to="{ 
            name: 'admin-restaurant-edit', 
            params: { 
              id: restaurant.id 
            } }" 
            class="btn btn-link">
          Edit
          </router-link>

          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
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
      viewCounts: 2,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-03-22T13:42:42.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
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
      id: 19,
      name: "Elyse Rowe",
      tel: "086-152-3226 x371",
      address: "0862 Maggie Rapids",
      opening_hours: "08:00",
      description:
        "Impedit voluptate aut. Est debitis nam voluptatem neque voluptatem. Nihil enim dignissimos magni voluptas consectetur aut neque quo. Id et dolorem sunt consequatur quia recusandae debitis.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=86.76321105098307",
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
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 24,
      name: "Lonie Sanford",
      tel: "(308) 775-5294 x5777",
      address: "79758 Jonas Row",
      opening_hours: "08:00",
      description: "Fuga labore aut tenetur non aspernatur.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=91.68563660986746",
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
      id: 26,
      name: "Dina Yost",
      tel: "1-233-182-5461",
      address: "2327 Grant Station",
      opening_hours: "08:00",
      description:
        "Ut beatae eius est et sed voluptatem.\nExplicabo aliquam ut explicabo.\nFugiat assumenda nobis velit aliquid nam.\nEt et quod nemo fugiat.\nPossimus libero laborum consequuntur at provident accusamus.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=68.6008940239627",
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
      id: 38,
      name: "Mrs. Earnest Rath",
      tel: "956-120-7955 x6124",
      address: "3279 Little Mission",
      opening_hours: "08:00",
      description:
        "Eum qui voluptas repudiandae.\nDolorem dolores similique ut et.\nEnim repellat ad molestias dolor aut ad harum nihil.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=97.80863588091815",
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
      id: 45,
      name: "Mr. Chance Klocko",
      tel: "(010) 175-3384 x81049",
      address: "38925 Renner Field",
      opening_hours: "08:00",
      description: "qui",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=98.83661810195544",
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
      Category: {
        id: 1,
        name: "中式料理",
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
    {
      id: 13,
      name: "Richard Auer",
      tel: "214-334-7511 x7665",
      address: "399 Tillman Lakes",
      opening_hours: "08:00",
      description:
        "Modi sed in cum et ut voluptates aut. In maiores itaque placeat sint enim ipsa ducimus odio. Cupiditate nostrum tempora voluptatem nesciunt nesciunt eos recusandae rerum fuga. Voluptatem laboriosam et voluptatibus ab placeat voluptatibus sint dolorum.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=76.1369260459998",
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
      id: 17,
      name: "Mustafa Barton",
      tel: "454.411.3804 x3730",
      address: "0151 Magnolia Streets",
      opening_hours: "08:00",
      description: "provident",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=91.715680862825",
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
      id: 18,
      name: "Baby Champlin",
      tel: "(275) 742-3735 x320",
      address: "88403 Ofelia Roads",
      opening_hours: "08:00",
      description:
        "Soluta voluptas voluptatibus consequatur quo officiis magni error corrupti. Earum dolores possimus voluptatem exercitationem nulla ut. Doloribus rerum est. Et voluptas non.\n \rOmnis nisi at soluta voluptatem. Quia et libero. Ut numquam eos voluptas id. Praesentium fugiat ipsum officiis.\n \rSed temporibus nemo quis iste ratione sit. Autem nostrum consequatur. Delectus qui dolor iure.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=21.73702579004251",
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
      id: 21,
      name: "Laurie Hackett",
      tel: "973-842-9273",
      address: "42917 Rodriguez Plains",
      opening_hours: "08:00",
      description:
        "Eum voluptas labore modi quos cum aut tempore delectus. Dolorum eligendi possimus sit veritatis a fuga tempora est. Aut quia recusandae nihil. Ad ipsum iure velit dolorem perferendis et ut praesentium.\n \rMolestiae aspernatur est doloribus. Doloremque commodi ducimus. Excepturi beatae ut velit id quibusdam fugiat optio incidunt dolores. Minus quidem at est nisi culpa sint accusantium aspernatur.\n \rSed non tempora animi inventore asperiores fugiat cumque vel facere. Fuga repudiandae ab. Maiores quia libero magni perferendis qui. Omnis repudiandae est autem ut voluptatem. Dolores incidunt laboriosam cum sunt perferendis consequatur. Quidem quam suscipit quisquam voluptatem consequatur ut occaecati.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=35.48321333467859",
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
      id: 29,
      name: "Kenya Kutch",
      tel: "1-856-793-3469 x3805",
      address: "7111 Assunta Grove",
      opening_hours: "08:00",
      description:
        "Voluptatem earum ea quod et quam sunt cum laudantium a. Earum quidem et necessitatibus. Velit quas est rerum. Sit accusantium cupiditate et voluptatem inventore quibusdam. Tempore fugit vero harum cumque.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=86.91629381846278",
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
      id: 42,
      name: "Eugene Morissette",
      tel: "697.131.6468 x4940",
      address: "413 Parker Place",
      opening_hours: "08:00",
      description:
        "Omnis reiciendis asperiores in quia. Perferendis neque eveniet adipisci cum dolores aut accusantium sequi commodi. Voluptatibus incidunt aut cupiditate quia quia quia.\n \rNisi dolor ipsam dolores corporis error similique fugiat rem iure. Ut culpa commodi. Debitis iste error alias quis.\n \rEt et laboriosam accusantium sint corporis odio ut est. Soluta at optio beatae excepturi corrupti quia. Et qui rem explicabo rerum ducimus aut quia. Beatae quod quae nobis et omnis quis.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=12.162598113324519",
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
      id: 16,
      name: "Sydni Dare",
      tel: "(458) 403-5260",
      address: "36732 Altenwerth Corner",
      opening_hours: "08:00",
      description:
        "Dolor est ipsa voluptatem modi itaque.\nUt totam sit.\nDicta qui illo sed.\nSunt illo quis autem magni molestiae.\nMolestiae aspernatur quia ducimus ut aperiam dolore et quasi corrupti.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=45.95092103506884",
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
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 22,
      name: "Collin Yost II",
      tel: "1-263-736-4194",
      address: "25528 Grady Courts",
      opening_hours: "08:00",
      description:
        "Fuga natus aspernatur. Voluptatem maiores iure qui ipsum. Nihil et unde aut ea.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=13.976218547395458",
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
      id: 28,
      name: "Westley Marquardt",
      tel: "1-984-897-4064",
      address: "986 Boyer Ramp",
      opening_hours: "08:00",
      description:
        "Adipisci aut accusamus culpa temporibus sit consectetur. Ab est doloremque sit non sunt. Culpa labore vitae earum necessitatibus tempora. Velit quia earum. Ut aut officiis molestiae voluptatem. Sunt quo aut.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=60.73863721473318",
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
      id: 30,
      name: "Mr. Kathlyn Lehner",
      tel: "1-027-961-2758",
      address: "29301 Schinner Court",
      opening_hours: "08:00",
      description:
        "Quam sit esse sequi inventore similique tempore doloremque aut. Itaque nulla officiis. Numquam et officiis consequatur reprehenderit excepturi ad. Assumenda ipsa natus modi consequuntur velit dolorem reprehenderit laudantium.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=71.05032503496386",
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
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 35,
      name: "Enrico Dickens",
      tel: "982-256-9158 x650",
      address: "23526 Hyatt Lodge",
      opening_hours: "08:00",
      description:
        "In quia repudiandae vero sit porro nisi veritatis nisi. Quasi consequatur beatae aspernatur quasi aspernatur. Et quam aspernatur aut in sit mollitia occaecati omnis vel. Est commodi aut temporibus. Incidunt est omnis modi et saepe et est iste. Aliquid ex aut nemo.\n \rRem tempora nobis repellat commodi laudantium et dolorem. Harum recusandae amet voluptatem autem aliquam qui sequi consectetur. Optio aperiam qui architecto quisquam a animi doloremque.\n \rAutem similique aut porro dolores sit nesciunt. Deserunt maxime aperiam ea qui nihil ut suscipit saepe sed. Amet tenetur commodi accusamus non iste et non sequi laudantium. Ducimus ipsam recusandae distinctio nulla sequi animi non. Maiores repudiandae hic culpa odit assumenda non ex numquam. Aut hic dolor rem veritatis omnis qui.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=87.32819415652429",
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
      id: 36,
      name: "Matt Padberg V",
      tel: "924.646.4016",
      address: "2300 Windler Inlet",
      opening_hours: "08:00",
      description: "veniam",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=13.327246237586543",
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
      id: 40,
      name: "Camron Ledner",
      tel: "(043) 288-4675 x641",
      address: "89034 Ryan Prairie",
      opening_hours: "08:00",
      description: "cumque enim quos",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=14.800628001428716",
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
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 44,
      name: "Kip Bruen",
      tel: "618.278.3658",
      address: "2245 Goodwin Harbor",
      opening_hours: "08:00",
      description:
        "Et vero perspiciatis eaque qui dolore nihil harum quo et. Veritatis incidunt necessitatibus excepturi possimus quia omnis necessitatibus. Deserunt nisi sint error consectetur ab. Qui iste eos sequi. Ea illo alias doloribus ut eaque quia voluptates magni magnam. Dolorem libero soluta eius mollitia modi rerum.\n \rDolore omnis molestiae explicabo temporibus rerum est ratione. Maxime quia quam est rem voluptatem quia id quis delectus. Perferendis voluptas qui error velit dolorum rerum repudiandae. Dolorem et doloribus maiores nulla debitis. Et est blanditiis. Iste natus incidunt.\n \rEst illo quae consequatur sequi. Incidunt animi expedita possimus earum. Hic eum laboriosam non.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=4.9144905653760285",
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
      id: 47,
      name: "Shanelle Yundt",
      tel: "1-805-142-2650",
      address: "9610 Leffler Stream",
      opening_hours: "08:00",
      description:
        "Et voluptatem neque atque minima. Ex voluptatibus est atque. Vitae ea tempore cum dolor.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=27.52558173529014",
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
      id: 49,
      name: "Ashlynn Hodkiewicz",
      tel: "727-171-4018 x310",
      address: "846 Bechtelar Crossroad",
      opening_hours: "08:00",
      description: "Debitis odit aut eligendi.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=45.80733720908625",
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
      id: 11,
      name: "Mrs. Jeanie Metz",
      tel: "546.557.3708",
      address: "964 Amya Islands",
      opening_hours: "08:00",
      description: "doloribus sint et",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=61.27217387390647",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 12,
      name: "Miss Claudia Reilly",
      tel: "1-251-018-1078 x1328",
      address: "0029 Erdman Mews",
      opening_hours: "08:00",
      description:
        "Asperiores sint in numquam.\nAccusamus ut veniam.\nModi veniam alias illo animi.\nDicta non quo exercitationem optio consequatur corporis.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=9.742514032256988",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 14,
      name: "Aida Heaney",
      tel: "640-607-7085 x4927",
      address: "06076 Howell Harbor",
      opening_hours: "08:00",
      description:
        "Qui tempore molestias est quis. Tempora odit deleniti tenetur aliquid. Et dicta in temporibus suscipit ea.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=34.513828782555954",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 15,
      name: "Benny Kulas",
      tel: "1-861-997-8356 x564",
      address: "532 Roob Lock",
      opening_hours: "08:00",
      description:
        "Earum hic sint beatae facilis sit amet sunt. Neque quia excepturi et architecto. Porro aut voluptas optio praesentium officia nulla voluptatem non est.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=47.041760819405035",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 32,
      name: "Lemuel Purdy",
      tel: "1-238-086-9798",
      address: "74408 Cruickshank Fords",
      opening_hours: "08:00",
      description:
        "Laboriosam blanditiis adipisci temporibus omnis ea eaque est neque.\nEst assumenda excepturi fugiat quia voluptas ab eum.\nSed repellendus ex.\nHarum et veniam reprehenderit nam temporibus voluptas qui quia.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=35.42886467339419",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
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
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 39,
      name: "George Homenick",
      tel: "1-134-136-6465",
      address: "8596 Howe Way",
      opening_hours: "08:00",
      description:
        "Consequatur facilis occaecati maxime nihil quas. Sed et laboriosam est et neque suscipit aspernatur. Beatae earum eum perferendis. Mollitia esse et nesciunt et eaque et quisquam quis aut. Odit impedit est iste autem provident earum. Quae laudantium et enim placeat impedit eius nam perferendis veniam.\n \rDolore fugiat et dolorum cumque quia quia quasi perferendis. Sed et at fugit vitae doloribus labore fugit. Qui alias aut repudiandae rerum enim placeat iste.\n \rHic ullam at soluta quia quas. Et quam dolor. Est ipsa architecto recusandae molestias illum. Dolor delectus rem. Rerum dicta ea est fugiat magnam nam fuga ea nulla. Maxime asperiores dolores aut.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=18.41816789196562",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 43,
      name: "Piper Keeling",
      tel: "877.309.6491 x326",
      address: "3406 Geovanni Isle",
      opening_hours: "08:00",
      description:
        "Officiis delectus quia incidunt explicabo vel et et hic voluptatem.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=59.80624987824663",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 50,
      name: "Ryleigh Ullrich MD",
      tel: "1-172-530-1073",
      address: "60005 Ebert Extensions",
      opening_hours: "08:00",
      description: "Rerum modi labore at.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=41.01274672500628",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
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
      id: 25,
      name: "Glenna Johnson MD",
      tel: "1-301-481-0486",
      address: "48914 Swift Plain",
      opening_hours: "08:00",
      description: "Aut sed vel velit ipsa perferendis dignissimos sed.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=43.68787430571373",
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
      id: 27,
      name: "Ms. Toney Ullrich",
      tel: "700-645-8153 x81130",
      address: "405 Jasper Lake",
      opening_hours: "08:00",
      description:
        "Officia alias aliquam dolorem et. Reprehenderit officiis ullam quo similique officia rerum et repellat. Aspernatur dignissimos qui ut. Hic qui quidem sint accusamus occaecati consequuntur harum aliquam reiciendis. Excepturi nihil id id. Amet accusantium et.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=47.84337121897444",
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
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
    {
      id: 37,
      name: "Maximillian Spinka",
      tel: "451-766-1737",
      address: "477 Jerde Ramp",
      opening_hours: "08:00",
      description: "quas sed omnis",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=2.1646104050035975",
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
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
    },
  ],
};

export default {
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants;
    },
		deleteRestaurant (restaurantId) {
			// 運用 filter 重新過濾一次資料陣列，把「不是 restaurant.id 的資料保留下來」。
      this.restaurants = this.restaurants.filter(
        restaurant => restaurant.id !== restaurantId
      )
    }
  },
};
</script>