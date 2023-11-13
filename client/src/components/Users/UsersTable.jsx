import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    useDisclosure,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';
import { Link } from 'react-router-dom';

import {
    UserPlus,
    VerticalDotsIcon,
    SearchIcon,
    ChevronDownIcon,
} from '../../icons/Icons';

import { capitalize } from '../../utils/capitalize';
import { sliceText } from '../../utils/sliceText';
import {
    columns,
    roleColorMap,
    statusOptions,
    INITIAL_VISIBLE_COLUMNS,
} from '../../Constants/userTableConstants';

import FormatDate from '../FormatDate';
import LoadingSpinner from '../LoadingSpinner';
import UserModalForm from './UserModalForm';

import {
    useDeleteUserMutation,
    useGetAllUsersQuery,
} from '../../app/api/usersApi';

const UsersTable = () => {
    const {
        isLoading: isGetAllUsersLoading,
        isFetching: isGetAllUsersFetching,
        isError: isGetAllUsersError,
        isSuccess: isGetAllUsersSuccess,
        error: getAllUsersError,
        data: users,
    } = useGetAllUsersQuery();
    const [deleteUser, { isLoading, isError, error, isSuccess }] =
        useDeleteUserMutation();

    const { onOpen, isOpen, onOpenChange } = useDisclosure();

    const [selectedUser, setSelectedUser] = React.useState(null);
    const [filterValue, setFilterValue] = React.useState('');
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [statusFilter, setStatusFilter] = React.useState('all');
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: 'username',
        direction: 'ascending',
    });
    const [page, setPage] = React.useState(1);

    const pages = React.useMemo(() => {
        return users?.length ? Math.ceil(users.length / rowsPerPage) : 0;
    }, [users?.length, rowsPerPage]);

    const loadingState =
        isGetAllUsersLoading ||
        isGetAllUsersFetching ||
        isLoading ||
        users?.length === 0
            ? 'loading'
            : 'idle';

    React.useEffect(() => {
        if (isSuccess) {
            toast.success('User deleted successfully');
            NProgress.done();
        }

        if (isGetAllUsersSuccess) {
            toast.success('Get All Users Successfully');
            NProgress.done();
        }

        if (isError || isGetAllUsersError) {
            NProgress.done();
            const err = error || getAllUsersError;
            if (Array.isArray(err.data.error)) {
                err.data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                const resMessage =
                    err.data.message ||
                    err.data.detail ||
                    err.message ||
                    err.toString();
                toast.error(resMessage, {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isGetAllUsersLoading]);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = users;

        if (hasSearchFilter && Array.isArray(filteredUsers)) {
            filteredUsers = filteredUsers.filter((user) =>
                user.username.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (
            statusFilter !== 'all' &&
            Array.from(statusFilter).length !== statusOptions.length &&
            Array.isArray(filteredUsers)
        ) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.role)
            );
        }

        return filteredUsers;
    }, [users, filterValue, statusFilter, hasSearchFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        if (Array.isArray(filteredItems))
            return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        if (items)
            return items.sort((a, b) => {
                const first = a[sortDescriptor.column];
                const second = b[sortDescriptor.column];
                const cmp = first < second ? -1 : first > second ? 1 : 0;

                return sortDescriptor.direction === 'descending' ? -cmp : cmp;
            });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback(
        (user, columnKey) => {
            const cellValue = user[columnKey];

            const handleDelete = (userId) => {
                if (
                    window.confirm('Are you sure you want to delete this user?')
                ) {
                    deleteUser(userId);

                    if (isSuccess) {
                        alert('User Deleted Successfully!');
                    }
                }
            };

            const handleUpdate = () => {
                setSelectedUser(user);
                onOpenChange(true);
            };

            switch (columnKey) {
                case 'username':
                    return (
                        <User
                            avatarProps={{
                                radius: 'full',
                                size: 'sm',
                                src: user.avatar
                                    ? user.avatar
                                    : 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
                            }}
                            classNames={{
                                description: 'text-default-500',
                            }}
                            description={user.email}
                            name={cellValue}
                        >
                            {user.email}
                        </User>
                    );
                case 'role':
                    return (
                        <p
                            className={`capitalize text-sm font-semibold text-${
                                roleColorMap[user.role.toLowerCase()]
                            }`}
                        >
                            {cellValue}
                        </p>
                    );
                case 'status':
                    return (
                        <Chip
                            className='capitalize border-none gap-1 text-default-600'
                            color={roleColorMap[user.role]}
                            size='sm'
                            variant='dot'
                        >
                            {cellValue}
                        </Chip>
                    );
                case 'actions':
                    return (
                        <div className='relative flex justify-end items-center gap-2'>
                            <Dropdown className='bg-background border-1 border-default-200'>
                                <DropdownTrigger>
                                    <Button
                                        isIconOnly
                                        radius='full'
                                        size='sm'
                                        variant='light'
                                    >
                                        <VerticalDotsIcon className='text-default-400' />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to={`/admin/users/${user._id}`}>
                                            View
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem onPress={handleUpdate}>
                                        Edit
                                    </DropdownItem>
                                    <DropdownItem
                                        onPress={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    );
                case '_id':
                    return (
                        <div>
                            <p className='text-gray-500 dark:text-gray-300'>
                                {sliceText(cellValue, 10)}
                            </p>
                        </div>
                    );
                case 'creation_date':
                    return <FormatDate cellValue={cellValue} />;
                case 'last_login':
                    return <FormatDate cellValue={cellValue} />;
                case 'last_update':
                    return <FormatDate cellValue={cellValue} />;

                default:
                    return cellValue;
            }
        },
        [deleteUser, isSuccess, onOpenChange]
    );

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between gap-3 items-end'>
                    <Input
                        isClearable
                        classNames={{
                            base: 'w-full sm:max-w-[44%]',
                            inputWrapper: 'border-1',
                        }}
                        placeholder='Search by name...'
                        size='sm'
                        startContent={
                            <SearchIcon className='text-default-300' />
                        }
                        value={filterValue}
                        variant='bordered'
                        onClear={() => setFilterValue('')}
                        onValueChange={onSearchChange}
                    />
                    <div className='flex gap-3'>
                        <Dropdown>
                            <DropdownTrigger className='hidden sm:flex'>
                                <Button
                                    endContent={
                                        <ChevronDownIcon className='text-small' />
                                    }
                                    size='sm'
                                    variant='flat'
                                >
                                    Role
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label='Table Columns'
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode='multiple'
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem
                                        key={status.uid}
                                        className='capitalize'
                                    >
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className='hidden sm:flex'>
                                <Button
                                    endContent={
                                        <ChevronDownIcon className='text-small' />
                                    }
                                    size='sm'
                                    variant='flat'
                                >
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label='Table Columns'
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode='multiple'
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem
                                        key={column.uid}
                                        className='capitalize'
                                    >
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        {isGetAllUsersLoading || isGetAllUsersFetching ? (
                            <Button
                                className='bg-foreground text-background'
                                size='sm'
                                isDisabled
                            >
                                Loading ...
                            </Button>
                        ) : (
                            <Button
                                className='bg-foreground text-background'
                                endContent={<UserPlus />}
                                size='sm'
                                onPress={onOpen}
                            >
                                Add User
                            </Button>
                        )}
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-default-400 text-small'>
                        Total {users && users.length} users
                    </span>
                    <label className='flex items-center text-default-400 text-small'>
                        Rows per page:
                        <select
                            className='bg-transparent outline-none text-default-400 text-small'
                            onChange={onRowsPerPageChange}
                        >
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        isGetAllUsersLoading,
        isGetAllUsersFetching,
        onOpen,
        users,
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className='py-2 px-2 flex justify-between items-center'>
                {pages > 0 ? (
                    <Pagination
                        showControls
                        classNames={{
                            cursor: 'bg-foreground text-background',
                        }}
                        color='default'
                        isDisabled={hasSearchFilter}
                        page={page}
                        total={pages}
                        variant='light'
                        onChange={setPage}
                    />
                ) : null}
                <span className='text-small text-default-400'>
                    {selectedKeys === 'all'
                        ? 'All items selected'
                        : `${selectedKeys.size} of ${
                              items?.length || 0
                          } selected`}
                </span>
            </div>
        );
    }, [selectedKeys, items, page, pages, hasSearchFilter]);

    const classNames = React.useMemo(
        () => ({
            wrapper: ['max-h-[382px]', 'max-w-3xl'],
            th: [
                'bg-transparent',
                'text-default-500',
                'border-b',
                'border-divider',
            ],
            td: [
                // changing the rows border radius
                // first
                'group-data-[first=true]:first:before:rounded-none',
                'group-data-[first=true]:last:before:rounded-none',
                // middle
                'group-data-[middle=true]:before:rounded-none',
                // last
                'group-data-[last=true]:first:before:rounded-none',
                'group-data-[last=true]:last:before:rounded-none',
            ],
        }),
        []
    );

    return (
        <>
            <UserModalForm
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                userData={selectedUser}
            />
            <div className='rounded-md p-4 shadow-sm overflow-y-scroll bg-white dark:bg-primary-deepDark'>
                <h2 className='font-bold text-xl mb-4'>All Users</h2>
                <Table
                    isCompact
                    removeWrapper
                    aria-label='Example table with custom cells, pagination and sorting'
                    bottomContent={bottomContent}
                    bottomContentPlacement='outside'
                    checkboxesProps={{
                        classNames: {
                            wrapper:
                                'after:bg-foreground after:text-background text-background',
                        },
                    }}
                    classNames={classNames}
                    selectedKeys={selectedKeys}
                    selectionMode='multiple'
                    sortDescriptor={sortDescriptor}
                    topContent={topContent}
                    topContentPlacement='outside'
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={
                                    column.uid === 'actions'
                                        ? 'center'
                                        : 'start'
                                }
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        emptyContent={'No users found'}
                        items={sortedItems ?? []}
                        loadingContent={<LoadingSpinner />}
                        loadingState={loadingState}
                    >
                        {(item) => (
                            <TableRow key={item?._id}>
                                {(columnKey) => (
                                    <TableCell key={columnKey}>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default UsersTable;
