import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
}

export const Categories: React.FC<CategoriesProps> = React.memo(({value, onClickCategory}) => {

  const category = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {category.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
})
