import Select, {CSSObjectWithLabel, Props as SelectProps} from "react-select";
import {ISelectOption} from "../../typescript/common";
import {useTheme} from "@mui/material";
import {StylesProps} from "react-select/dist/declarations/src/styles";
import {CSSObject} from "@emotion/styled";
import {useMemo} from "react";

interface IProps<Option, IsMulti extends boolean> extends Partial<Omit<SelectProps<Option, IsMulti>, 'value' | 'onChange' | 'options' | 'styles'>> {
  value: SelectProps<Option, IsMulti>['value'],
  onChange: SelectProps<Option, IsMulti>['onChange'],
  options: SelectProps<Option, IsMulti>['options'],
  styles?: Partial<Record<keyof StylesProps<Option, IsMulti, any>, CSSObject>>,
}

const stylesComponents: (keyof StylesProps<any, any, any>)[] = [
  'clearIndicator',
  'control',
  'dropdownIndicator',
  'group',
  'groupHeading',
  'indicatorsContainer',
  'indicatorSeparator',
  'input',
  'loadingIndicator',
  'menu',
  'menuList',
  'menuPortal',
  'loadingMessage',
  'noOptionsMessage',
  'multiValue',
  'multiValueLabel',
  'multiValueRemove',
  'option',
  'placeholder',
  'singleValue',
  'valueContainer',
]

export const CommonSelect = <T, IsMulti extends boolean>(props: IProps<ISelectOption<T>, IsMulti>) => {
  const theme = useTheme()

  const defaultStyles: IProps<any, any>['styles'] = useMemo(() => {
    return {
      control: {
        background: theme.palette.custom.formItemBg,
        '& *': {
          color: theme.palette.text.primary,
        },
      },
      singleValue: {
        '&, & *': {
          color: theme.palette.text.primary,
        },
      },
      multiValue: {
        '&, & *': {
          color: theme.palette.text.primary,
        },
      },
      menu: {
        zIndex: 2,
        marginTop: 0,
        background: theme.palette.custom.formItemBg,
      },
      option: {
        background: theme.palette.custom.formItemBg,
        '&:hover': {
          background: theme.palette.custom.formItemHoverBg,
        },
        '&.react-select__option--is-selected': {
          background: theme.palette.custom.formItemSelectedBg,
        },
      },
    }
  }, [theme])

  return (
    <Select<Readonly<ISelectOption<T>>, IsMulti>
      {...props}
      classNamePrefix={props.classNamePrefix || "react-select"}
      styles={
        Object.fromEntries(
          stylesComponents.map(item => [
            item,
            (baseStyles: CSSObjectWithLabel) => ({
              ...baseStyles,
              ...((defaultStyles[item]) || {}),
              ...((props.styles && props.styles[item]) || {}),
            })
          ])
        )
      }
    />
  )
}