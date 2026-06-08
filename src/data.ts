export type CategoryName = 'main' | 'soup' | 'snack' | 'dessert';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Step {
  num: string;
  technique: string;
  text: string;
  time: string;
}

export interface Recipe {
  id: number;
  title: string;
  photoPath: string;
  category_name: CategoryName;
  category_display_name: string;
  cookTime: string;
  servings: number;
  versionsCount: number;
  techniques: string[];
  ingredients: Ingredient[];
  steps: Step[];
}

const createIngredient = (name: string, amount: number, unit: string): Ingredient => ({
  name,
  amount,
  unit,
});

const createStep = (num: string, technique: string, text: string, time: string): Step => ({
  num,
  technique,
  text,
  time,
});

const createRecipe = (
  id: number,
  title: string,
  photoPath: string,
  category_name: CategoryName,
  category_display_name: string,
  cookTime: string,
  servings: number,
  versionsCount: number,
  techniques: string[],
  ingredients: Ingredient[],
  steps: Step[]
): Recipe => ({
  id,
  title,
  photoPath,
  category_name,
  category_display_name,
  cookTime,
  servings,
  versionsCount,
  techniques,
  ingredients,
  steps,
});

export const recipes: Recipe[] = [
  createRecipe(1, "Canard à l'Orange", "photos/сanard_a_lOrange.jpeg", "main", "Основна страва", "2 год", 4, 3,
    ["Searing", "Sauce bigarade"],
    [
      createIngredient("Качка ціла", 1.8, "кг"),
      createIngredient("Апельсини", 3, "шт"),
      createIngredient("Фонд телячий", 300, "мл"),
      createIngredient("Цукор", 60, "г"),
    ],
    [
      createStep("01", "Brunoise", "Очистіть качку...", "15 хв"),
      createStep("02", "Searing", "Обсмажте качку...", "20 хв"),
    ]
  ),
  createRecipe(2, "Boeuf Bourguignon", "photos/boeuf_bourguignon.jpg", "main", "Основна страва", "3.5 год", 6, 5,
    ["Braising", "Deglazing"],
    [
      createIngredient("Яловичина (лопатка)", 1.2, "кг"),
      createIngredient("Червоне сухе вино", 750, "мл"),
      createIngredient("Печериці", 300, "г"),
      createIngredient("Бекон", 150, "г"),
    ],
    [
      createStep("01", "Mise en place", "Наріжте м'ясо кубиками та обсушіть...", "20 хв"),
      createStep("02", "Searing", "Обсмажте м'ясо до рум'яної скоринки...", "15 хв"),
    ]
  ),
  createRecipe(3, "Risotto ai Funghi", "photos/risotto_ai_funghi.jpg", "main", "Основна страва", "40 хв", 2, 2,
    ["Toasting", "Emulsifying"],
    [
      createIngredient("Рис Арборіо", 200, "г"),
      createIngredient("Білі гриби", 250, "г"),
      createIngredient("Пармезан", 50, "г"),
      createIngredient("Вершкове масло", 40, "г"),
    ],
    [
      createStep("01", "Sauter", "Обсмажте гриби з часником...", "10 хв"),
      createStep("02", "Mantecatura", "Інтенсивно вмішайте холодне масло та сир...", "5 хв"),
    ]
  ),
  createRecipe(4, "Crème Brûlée", "photos/creme_brulee.jpg", "dessert", "Десерт", "1 год + охолодження", 4, 4,
    ["Bain-marie", "Caramelization"],
    [
      createIngredient("Вершки 33%", 500, "мл"),
      createIngredient("Жовтки", 6, "шт"),
      createIngredient("Цукор тростинний", 80, "г"),
      createIngredient("Ваніль", 1, "стручок"),
    ],
    [
      createStep("01", "Infusion", "Нагрійте вершки з ваніллю...", "10 хв"),
      createStep("02", "Baking", "Випікайте на водяній бані при 100°C...", "45 хв"),
    ]
  ),
  createRecipe(5, "Salade Niçoise", "photos/salade_nicoise.jpg", "snack", "Закуска", "30 хв", 2, 3,
    ["Blanching", "Emulsion"],
    [
      createIngredient("Тунець свіжий", 200, "г"),
      createIngredient("Стручкова квасоля", 100, "г"),
      createIngredient("Яйця перепелині", 4, "шт"),
      createIngredient("Анчоуси", 4, "філе"),
    ],
    [
      createStep("01", "Blanching", "Ошпарте квасолю та охолодіть у льоду...", "5 хв"),
      createStep("02", "Grilling", "Швидко обсмажте тунець (Medium Rare)...", "4 хв"),
    ]
  ),
  createRecipe(6, "Soupe à l'Oignon", "photos/soupe_a_lOignon.jpg", "soup", "Суп", "1.5 год", 4, 2,
    ["Caramelization", "Gratiner"],
    [
      createIngredient("Цибуля жовта", 1, "кг"),
      createIngredient("Яловичий бульйон", 1.2, "л"),
      createIngredient("Багет", 0.5, "шт"),
      createIngredient("Сир Грюєр", 100, "г"),
    ],
    [
      createStep("01", "Slow Cooking", "Томіть цибулю до глибокого золотистого кольору...", "50 хв"),
      createStep("02", "Gratiner", "Запечіть суп з грінкою та сиром до скоринки...", "10 хв"),
    ]
  ),
  createRecipe(7, "Ratatouille", "photos/ratatouille.jpeg", "main", "Гарнір / Основна", "1.2 год", 4, 3,
    ["Confit", "Mandoline slicing"],
    [
      createIngredient("Баклажан", 2, "шт"),
      createIngredient("Цукіні", 2, "шт"),
      createIngredient("Томати", 5, "шт"),
      createIngredient("Перець болгарський", 2, "шт"),
    ],
    [
      createStep("01", "Slicing", "Наріжте овочі тонкими слайсами...", "20 хв"),
      createStep("02", "Stewing", "Викладіть шарами на соус піперад та запікайте...", "50 хв"),
    ]
  ),
  createRecipe(8, "Coq au Vin", "photos/coq_au_vin.jpg", "main", "Основна страва", "2.5 год", 4, 2,
    ["Marinating", "Flambé"],
    [
      createIngredient("Курка (стегна)", 1.5, "кг"),
      createIngredient("Вино червоне", 500, "мл"),
      createIngredient("Коньяк", 50, "мл"),
      createIngredient("Перлова цибуля", 200, "г"),
    ],
    [
      createStep("01", "Flambé", "Підпаліть коньяк для видалення алкоголю...", "2 хв"),
      createStep("02", "Braising", "Тушкуйте птицю у вині з овочами...", "90 хв"),
    ]
  ),
];