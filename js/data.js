const recipes = [
  {
    id: 1,
    title: "Canard à l'Orange",
    photoPath: "photos/сanard_a_lOrange.jpeg",
    category_name: "main",
    category_display_name: "Основна страва",
    cookTime: "2 год",
    servings: 4,
    versionsCount: 3,
    techniques: ["Searing", "Sauce bigarade"],
    ingredients: [
      { name: "Качка ціла", amount: 1.8, unit: "кг" },
      { name: "Апельсини", amount: 3, unit: "шт" },
      { name: "Фонд телячий", amount: 300, unit: "мл" },
      { name: "Цукор", amount: 60, unit: "г" },
    ],
    steps: [
      { num: "01", technique: "Brunoise", text: "Очистіть качку...", time: "15 хв" },
      { num: "02", technique: "Searing", text: "Обсмажте качку...", time: "20 хв" },
    ]
  },
  {
    id: 2,
    title: "Boeuf Bourguignon",
    photoPath: "photos/boeuf_bourguignon.jpg",
    category_name: "main",
    category_display_name: "Основна страва",
    cookTime: "3.5 год",
    servings: 6,
    versionsCount: 5,
    techniques: ["Braising", "Deglazing"],
    ingredients: [
      { name: "Яловичина (лопатка)", amount: 1.2, unit: "кг" },
      { name: "Червоне сухе вино", amount: 750, unit: "мл" },
      { name: "Печериці", amount: 300, unit: "г" },
      { name: "Бекон", amount: 150, unit: "г" },
    ],
    steps: [
      { num: "01", technique: "Mise en place", text: "Наріжте м'ясо кубиками та обсушіть...", time: "20 хв" },
      { num: "02", technique: "Searing", text: "Обсмажте м'ясо до рум'яної скоринки...", time: "15 хв" },
    ]
  },
  {
    id: 3,
    title: "Risotto ai Funghi",
    photoPath: "photos/risotto_ai_funghi.jpg",
    category_name: "main",
    category_display_name: "Основна страва",
    cookTime: "40 хв",
    servings: 2,
    versionsCount: 2,
    techniques: ["Toasting", "Emulsifying"],
    ingredients: [
      { name: "Рис Арборіо", amount: 200, unit: "г" },
      { name: "Білі гриби", amount: 250, unit: "г" },
      { name: "Пармезан", amount: 50, unit: "г" },
      { name: "Вершкове масло", amount: 40, unit: "г" },
    ],
    steps: [
      { num: "01", technique: "Sauter", text: "Обсмажте гриби з часником...", time: "10 хв" },
      { num: "02", technique: "Mantecatura", text: "Інтенсивно вмішайте холодне масло та сир...", time: "5 хв" },
    ]
  },
  {
    id: 4,
    title: "Crème Brûlée",
    photoPath: "photos/creme_brulee.jpg",
    category_name: "dessert",
    category_display_name: "Десерт",
    cookTime: "1 год + охолодження",
    servings: 4,
    versionsCount: 4,
    techniques: ["Bain-marie", "Caramelization"],
    ingredients: [
      { name: "Вершки 33%", amount: 500, unit: "мл" },
      { name: "Жовтки", amount: 6, unit: "шт" },
      { name: "Цукор тростинний", amount: 80, unit: "г" },
      { name: "Ваніль", amount: 1, unit: "стручок" },
    ],
    steps: [
      { num: "01", technique: "Infusion", text: "Нагрійте вершки з ваніллю...", time: "10 хв" },
      { num: "02", technique: "Baking", text: "Випікайте на водяній бані при 100°C...", time: "45 хв" },
    ]
  },
  {
    id: 5,
    title: "Salade Niçoise",
    photoPath: "photos/salade_nicoise.jpg",
    category_name: "snack",
    category_display_name: "Закуска",
    cookTime: "30 хв",
    servings: 2,
    versionsCount: 3,
    techniques: ["Blanching", "Emulsion"],
    ingredients: [
      { name: "Тунець свіжий", amount: 200, unit: "г" },
      { name: "Стручкова квасоля", amount: 100, unit: "г" },
      { name: "Яйця перепелині", amount: 4, unit: "шт" },
      { name: "Анчоуси", amount: 4, unit: "філе" },
    ],
    steps: [
      { num: "01", technique: "Blanching", text: "Ошпарте квасолю та охолодіть у льоду...", time: "5 хв" },
      { num: "02", technique: "Grilling", text: "Швидко обсмажте тунець (Medium Rare)...", time: "4 хв" },
    ]
  },
  {
    id: 6,
    title: "Soupe à l'Oignon",
    photoPath: "photos/soupe_a_lOignon.jpg",
    category_name: "soup",
    category_display_name: "Суп",
    cookTime: "1.5 год",
    servings: 4,
    versionsCount: 2,
    techniques: ["Caramelization", "Gratiner"],
    ingredients: [
      { name: "Цибуля жовта", amount: 1, unit: "кг" },
      { name: "Яловичий бульйон", amount: 1.2, unit: "л" },
      { name: "Багет", amount: 0.5, unit: "шт" },
      { name: "Сир Грюєр", amount: 100, unit: "г" },
    ],
    steps: [
      { num: "01", technique: "Slow Cooking", text: "Томіть цибулю до глибокого золотистого кольору...", time: "50 хв" },
      { num: "02", technique: "Gratiner", text: "Запечіть суп з грінкою та сиром до скоринки...", time: "10 хв" },
    ]
  },
  {
    id: 7,
    title: "Ratatouille",
    photoPath: "photos/ratatouille.jpeg",
    category_name: "main",
    category_display_name: "Гарнір / Основна",
    cookTime: "1.2 год",
    servings: 4,
    versionsCount: 3,
    techniques: ["Confit", "Mandoline slicing"],
    ingredients: [
      { name: "Баклажан", amount: 2, unit: "шт" },
      { name: "Цукіні", amount: 2, unit: "шт" },
      { name: "Томати", amount: 5, unit: "шт" },
      { name: "Перець болгарський", amount: 2, unit: "шт" },
    ],
    steps: [
      { num: "01", technique: "Slicing", text: "Наріжте овочі тонкими слайсами...", time: "20 хв" },
      { num: "02", technique: "Stewing", text: "Викладіть шарами на соус піперад та запікайте...", time: "50 хв" },
    ]
  },
  {
    id: 8,
    title: "Coq au Vin",
    photoPath: "photos/coq_au_vin.jpg",
    category_name: "main",
    category_display_name: "Основна страва",
    cookTime: "2.5 год",
    servings: 4,
    versionsCount: 2,
    techniques: ["Marinating", "Flambé"],
    ingredients: [
      { name: "Курка (стегна)", amount: 1.5, unit: "кг" },
      { name: "Вино червоне", amount: 500, unit: "мл" },
      { name: "Коньяк", amount: 50, unit: "мл" },
      { name: "Перлова цибуля", amount: 200, unit: "г" },
    ],
    steps: [
      { num: "01", technique: "Flambé", text: "Підпаліть коньяк для видалення алкоголю...", time: "2 хв" },
      { num: "02", technique: "Braising", text: "Тушкуйте птицю у вині з овочами...", time: "90 хв" },
    ]
  }
];