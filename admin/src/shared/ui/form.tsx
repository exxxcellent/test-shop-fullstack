import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Typography,
} from '@mui/material';
import { Field } from '@shared/types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FormProps<T extends Record<string, any>> {
    title: string;
    fields: Field<Extract<keyof T, string>>[];
    schema: any;
    isPending?: boolean;
    onSubmit: (data: T) => void;
    buttonTitle?: string;
}

export default function Form<T extends Record<string, any>>({
    title,
    fields,
    schema,
    isPending = false,
    onSubmit,
    buttonTitle = 'create',
}: FormProps<T>) {
    type FormData = yup.InferType<typeof schema>;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (data: T) => {
        if (onSubmit) {
            onSubmit(data);
            return;
        }
    };

    return (
        <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmitHandler)}>
            <Typography variant="h3">{title}</Typography>
            <Box className="flex flex-col gap-3 w-full">
                {fields.map((item) => (
                    <Controller
                        key={item.name}
                        name={item.name as Extract<keyof T, string>}
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                variant="standard"
                                fullWidth>
                                {item.type !== 'file' ? (
                                    <>
                                        <InputLabel htmlFor={item.name}>
                                            {item.label}
                                        </InputLabel>
                                        <Input
                                            color={
                                                errors[item.name]
                                                    ? 'error'
                                                    : 'info'
                                            }
                                            {...field}
                                            id={item.name}
                                            type={item.type}
                                            aria-describedby={`${item.name}-error-text`}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            component="label"
                                            variant="contained"
                                            color={
                                                errors[item.name]
                                                    ? 'error'
                                                    : 'success'
                                            }
                                            startIcon={<CloudUploadIcon />}>
                                            Upload image
                                            <input
                                                {...field}
                                                aria-describedby={`${item.name}-error-text`}
                                                className="hidden"
                                                type="file"
                                            />
                                        </Button>
                                    </>
                                )}
                                {errors[item.name] && (
                                    <FormHelperText
                                        id={`${item.name}-error-text`}>
                                        <Typography
                                            variant="body2"
                                            color="error">
                                            {errors[item.label] &&
                                                (errors[item.label]
                                                    ?.message as string)}
                                        </Typography>
                                    </FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                ))}
            </Box>
            <Button
                type="submit"
                fullWidth
                loadingPosition="end"
                variant="contained"
                size="large"
                loading={isPending}>
                {buttonTitle}
            </Button>
        </form>
    );
}
