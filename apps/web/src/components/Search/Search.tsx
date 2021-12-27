import { FieldHookConfig, useField } from "formik";
import { useObservableState } from "observable-hooks";
import React, { useEffect, useMemo, useState } from "react";
import { BehaviorSubject, combineLatestWith, map, Observable } from "rxjs";

interface FilteredItem {
  id: string;
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
  const [field, , helpers] = useField(props);
  const search$ = useMemo(() => new BehaviorSubject(""), []);
  const [hasFocus, setHasFocus] = useState(false);

  const [filteredItems] = useObservableState(
    () =>
      search$.pipe(
        combineLatestWith(searchable),
        map(([search, items]) => {
          console.log({ items, search });
          if (search === "") {
            return items;
          }
          return items.filter((item) => {
            console.log(item[filterKey]);
            return item[filterKey].toLowerCase().includes(search.toLowerCase());
          });
        })
      ),
    []
  );

  const handleBlurOrClick = (itemId: string) => {
    console.log("click", itemId);
    helpers.setValue(itemId);
    search$.next(itemId);
  };

  console.log({ filteredItems });

  return (
    <div className="grid grid-cols-[minmax(0,_10ch)_minmax(0,_1fr)] py-2 relative">
      <label
        className="flex items-center whitespace-nowrap overflow-hidden overflow-ellipsis w-[10ch]"
        htmlFor={props.name}
      >
        {label}
      </label>
      <input
        {...field}
        onChange={(e) => {
          search$.next(e.target.value);
        }}
        onBlur={() => setHasFocus(false)}
        onFocus={() => setHasFocus(true)}
        value={search$.value}
        className="border-0 outline-none p-2 text-base focus:border-slate-700 border-b-2"
      />
      <ul className="absolute top-9 flex flex-col left-0 right-0 ml-[10ch] bg-white rounded-md rounded-t-none z-10 shadow-md overflow-hidden">
        {hasFocus &&
          filteredItems.map((item) => (
            <li
              className="p-1 hover:bg-teal-700 hover:text-white transition-colors cursor-pointer"
              key={item.id}
              onClick={() => handleBlurOrClick(item.id)}
            >
              {item[filterKey]}
            </li>
          ))}
      </ul>
    </div>
  );
};
