import {
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { ApiResponse, Prop, REQUEST_METHOD } from '@shared/types';
import { fetcher } from '@shared/utils/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { displayPropsFromArray } from '@shared/utils/display-props';
import { prepareProps } from '@shared/utils/prepare-props';
import { useNotifications } from '@toolpad/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Entity } from '@shared/types/enums/entity.enum';

interface TablePropsProps {
    id: string;
    data: Record<string, any>;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    entity: Entity;
}

export default function TableProps({
    data,
    isEdit,
    id,
    setIsEdit,
    entity,
}: TablePropsProps) {
    const queryClient = useQueryClient();
    const [props, setProps] = useState<Array<Prop>>([]);

    const helper: Record<Entity, any> = {
        [Entity.CATEGORY]: {
            url: 'category',
            type: 'Category',
        },
        [Entity.ITEM]: {
            url: 'item',
            type: 'Item',
        },
        [Entity.USER]: {
            url: 'user',
            type: 'User',
        },
        [Entity.ORDER]: {
            url: 'order',
            type: 'Order',
        },
    };

    const { url, type } = helper[entity];

    const notifications = useNotifications();

    const { isPending, mutate } = useMutation({
        mutationKey: [url, id],
        mutationFn: (data: Record<string, any>) =>
            fetcher<ApiResponse<typeof type>, Record<string, any>>(
                `/${url}/${id}`,
                REQUEST_METHOD.PUT,
                data,
            ),
        onSuccess: () => {
            setIsEdit(false);
            notifications.show(`${type} is updated!`, {
                autoHideDuration: 5000,
                severity: 'success',
            });
            queryClient.invalidateQueries({ queryKey: [url, id] });
        },
        onError: (error) => {
            notifications.show(`Error! ${error.message}`, {
                autoHideDuration: 5000,
                severity: 'error',
            });
            console.error(error);
        },
    });

    useEffect(() => {
        setProps(displayPropsFromArray(data));
    }, [data]);

    const onChangeInputHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: string,
    ) => {
        const propIndex = props.findIndex((prop) => prop.key === key);
        const newProps = props.map((prop, index) => {
            if (index === propIndex) prop.value = event.target.value;
            return prop;
        });
        setProps([...newProps]);
    };

    const onCopyHandler = (id: string) => {
        try {
            navigator.clipboard.writeText(id);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6">Property</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6">Value</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.map(({ key, value }: Prop) => {
                        return (
                            <TableRow key={key}>
                                <TableCell>
                                    <Typography variant="body1">
                                        {key}
                                    </Typography>
                                </TableCell>
                                {isEdit &&
                                key !== 'id' &&
                                key !== 'userId' &&
                                key !== 'itemId' &&
                                key !== 'createdAt' &&
                                key !== 'updatedAt' &&
                                !key.startsWith('_count') ? (
                                    <TableCell>
                                        <TextField
                                            onChange={(e) =>
                                                onChangeInputHandler(e, key)
                                            }
                                            value={value}
                                            size="medium"
                                            className="w-full"
                                        />
                                    </TableCell>
                                ) : (
                                    <TableCell
                                        className={
                                            key === 'id' || key === 'parentId'
                                                ? '!flex justify-between items-center'
                                                : ''
                                        }>
                                        <Typography>
                                            {value === null
                                                ? 'null'
                                                : (value as string)}
                                        </Typography>
                                        {(key === 'id' ||
                                            (key === 'parentId' &&
                                                value !== null)) && (
                                            <Tooltip title="Copy">
                                                <IconButton
                                                    onClick={() =>
                                                        onCopyHandler(value)
                                                    }>
                                                    <ContentCopyIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {isEdit && (
                <Button
                    fullWidth
                    loadingPosition="end"
                    endIcon={<SaveIcon />}
                    loading={isPending}
                    onClick={() => mutate(prepareProps(props))}
                    variant="contained"
                    size="large">
                    Save
                </Button>
            )}
        </>
    );
}
