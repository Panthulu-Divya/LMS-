"use client"

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface SelectProps{
  options: {label: string; value: string}[];
  value?: string;
  onChange: (value :string) => void;
};

export const SelectScrollable = ({
  options,
  value,
  onChange
}: SelectProps) => {

  
  return (

    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {options.map((option) => (
              <SelectItem key={option.value} value={option.value}
              >{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
