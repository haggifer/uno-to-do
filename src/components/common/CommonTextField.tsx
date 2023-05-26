import {FilledTextFieldProps, TextField, useTheme} from "@mui/material";
import _ from "lodash";
import {useMemo} from "react";

interface IProps extends Omit<FilledTextFieldProps, 'variant'> {
  noLabel?: boolean,
}

export const CommonTextField = (props: IProps) => {
  const spreadProps = useMemo(() => {
    let result = _.omit(props, ['noLabel', 'sx']);

    if (props.noLabel) {
      result = _.omit(result, ['label']);
    }

    return result
  }, [props])

  const theme = useTheme()

  return (
    <TextField
      variant="filled"
      {...spreadProps}
      sx={{
        borderRadius: '4px 4px 0px 0px',
        ...(
          props.noLabel ?
            {
              '& .MuiInputAdornment-root': {
                mt: '0 !important',
              },
              '& .MuiInputBase-input': {
                py: '16px',
              },
            } : {}
        ),
        ...(props.sx || {}),
      }}
      InputProps={{
        ...(props.InputProps || {}),
        sx: {
          borderRadius: '4px 4px 0px 0px',
          background: theme.palette.custom.grey['1'],
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '24px',
          '& ::placeholder': {
            opacity: 1,
            color: theme.palette.custom.grey['2'],
          },
          ...(props.InputProps?.sx || {}),
        },
      }}
      InputLabelProps={{
        ...(props.InputLabelProps || {}),
        shrink: true,
        sx: {
          ...(props.InputLabelProps?.sx || {}),
        },
      }}
    />
  )
}