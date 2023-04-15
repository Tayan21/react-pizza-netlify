import React from "react";

import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort, sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../components/Redux/slices/filterSlice";
import { useNavigate, Link } from "react-router-dom";
import qs from "qs";
import {
  fetchPizzas,
  selectPizzaData,
  TSearchPizzaPrarms,
} from "../components/Redux/slices/pizzaSlice";
import { useAppDispatch } from "../components/Redux/store";

export const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []) 

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  //Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as TSearchPizzaPrarms))
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //Если был первый рендер то проверяем URL-параметрыи сохраняем в редаксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = (qs.parse(window.location.search.substring(1))) as unknown as TSearchPizzaPrarms;

  //     const sort = sortList.find(
  //       (obj) => obj.sortProperty === params.sortBy
  //     );

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort ? sort : sortList[0],
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  //Если был первый рендер то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.title} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id: number) => onChangeCategory(id)}
        />
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content_error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить пиццы.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
