import { FieldHookConfig, useField } from "formik";
import { useObservableState } from "observable-hooks";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BehaviorSubject, combineLatestWith, map, Observable } from "rxjs";
import { useOnClickOutside } from "usehooks-ts";
import "./Search.scss";

interface FilteredItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface SearchProps {
  searchable: Observable<FilteredItem[]>;
  filterKey: string;
  label: string;
}

export const Search = ({
  label,
  searchable,
  filterKey,
  ...props
}: SearchProps & FieldHookConfig<string>) => {
  const clickRef = useRef(null);
  const [field, , helpers] = useField(props);
  const search$ = useMemo(() => new BehaviorSubject(""), []);
  const [hasFocus, setHasFocus] = useState(false);
  useOnClickOutside(clickRef, () => {
    setHasFocus(false);
  });

  const [filteredItems] = useObservableState(
    () =>
      search$.pipe(
        combineLatestWith(searchable),
        map(([search, items]) => {
          if (search === "") {
            return items;
          }
          return items.filter((item) => {
            return item[filterKey].toLowerCase().includes(search.toLowerCase());
          });
        })
      ),
    []
  );

  const handleBlurOrClick = (itemName: string) => {
    helpers.setValue(itemName);
    search$.next(itemName);
    setHasFocus(false);
  };

  return (
    <div className="Search" ref={clickRef}>
      <label className="Search__label" htmlFor={props.name}>
        {label}
      </label>
      <input
        {...field}
        onChange={(e) => {
          search$.next(e.target.value);
        }}
        onClick={() => setHasFocus(true)}
        value={search$.value}
        className="Search__input"
      />
      <ul className="Search__results">
        {hasFocus &&
          filteredItems.map((item) => (
            <li
              className="Search__results-item"
              key={item.id}
              onClick={() => handleBlurOrClick(item.name)}
            >
              {item[filterKey]}
            </li>
          ))}
      </ul>
    </div>
  );
};
