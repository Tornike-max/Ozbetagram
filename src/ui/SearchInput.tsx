import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useSearchPost } from "../features/posts/useSearchPost";
import SmallSpinner from "./SmallSpinner";
import { Input } from "@nextui-org/react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchInput() {
  const [searchVal, setSearchVal] = useState("");
  const { search, isSearching } = useSearchPost();

  function handleSearch(e: React.ChangeEvent, searchValue: string) {
    e.preventDefault();
    setSearchVal(searchValue);
    search({ searchValue });
  }

  return (
    <form className="flex items-center justify-center gap-2">
      <Input
        label="Search"
        isClearable
        type="search"
        value={searchVal}
        onChange={(e) => handleSearch(e, e.target.value)}
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <HiMagnifyingGlass className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />

      <Button type="submit" size="lg" disabled={isSearching} color="primary">
        {isSearching ? <SmallSpinner /> : "Search"}
      </Button>
    </form>
  );
}
