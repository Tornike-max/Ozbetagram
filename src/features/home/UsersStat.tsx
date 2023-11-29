import {
  Chip,
  ChipProps,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useCallback } from "react";
import { useUser } from "../users/useUser";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../users/useDeleteUser";
import { useDarkMode } from "../../context/useDarkMode";

type ColumnType = {
  name: string;
  uid: string;
};

type ColorType =
  | "primary"
  | "default"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

interface ModifiedChipProps extends ChipProps {
  color?: ColorType;
}

// Modify the existing Chip component type to accept the ModifiedChipProps
declare module "@nextui-org/react" {
  export interface ChipPropsy extends ModifiedChipProps {}
}

type UserType = {
  userId: string;
  id: number | string;
  email: string;
  status: keyof StatusTypes; // Update status to accept only keys of StatusTypes
  avatar: string;
};

// userId: user.id,
// id: Math.floor(Math.random() * 100),
// email: user?.email,
// status: user?.id === data?.id ? "active" : "paused",
// avatar: avatarURLs[index],

type StatusTypes = {
  active: string;
  paused: string;
  vacation: string;
};

const statusColorMap: Record<keyof StatusTypes, string> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function UserStat({
  users,
  columns,
}: {
  users: UserType[] | undefined;
  columns: ColumnType[];
}) {
  const { dark } = useDarkMode();
  const navigate = useNavigate();
  const { data } = useUser();
  const { deleteUser, isUserDeleting } = useDeleteUser();

  function handleNavigate(
    e: React.MouseEvent<Element, MouseEvent>,
    path: string
  ) {
    e.preventDefault();
    navigate(path);
  }

  function handleDeleteUser(
    e: React.MouseEvent<Element, MouseEvent>,
    userId: string
  ) {
    e.preventDefault();
    deleteUser(userId);
  }

  const renderCell = useCallback((user: UserType, column: ColumnType) => {
    const cellValue = user[column.uid as keyof UserType];

    switch (column.uid) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user?.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status] as ColorType}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2 sm:text-medium text-sm md:text-lg">
            <Tooltip content="Details">
              <button
                disabled={isUserDeleting}
                onClick={(e) => handleNavigate(e, `/account/${user.userId}`)}
                className="text-sm sm:text-medium md:text-lg  cursor-pointer active:opacity-50 text-indigo-500"
              >
                <HiEye />
              </button>
            </Tooltip>
            {user.userId === data?.id ? (
              <>
                {" "}
                <Tooltip content="Edit user">
                  <button
                    disabled={isUserDeleting}
                    onClick={(e) =>
                      handleNavigate(e, `/edit/user/${user.userId}`)
                    }
                    className="text-sm sm:text-medium md:text-lg text-indigo-500 cursor-pointer active:opacity-50"
                  >
                    <HiPencil />
                  </button>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <button
                    disabled={isUserDeleting}
                    onClick={(e) => handleDeleteUser(e, user?.userId)}
                    className="text-sm sm:text-medium md:text-lg text-danger cursor-pointer active:opacity-50"
                  >
                    <HiTrash />
                  </button>
                </Tooltip>{" "}
              </>
            ) : (
              ""
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with custom cells"
      style={{
        width: "100%",
        overflowX: "auto",
        backgroundColor: `${dark ? "#161616" : ""}`,
        borderRadius: "30px",
      }}
    >
      <TableHeader
        style={{
          backgroundColor: `${dark ? "#282626" : ""}`,
          borderRadius: `${dark ? "20px" : ""}`,
        }}
        columns={columns}
      >
        {(column) => (
          <TableColumn
            style={{
              backgroundColor: `${dark ? "#282626" : ""}`,
              color: `${dark ? "white" : ""}`,
            }}
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={users}
        style={{
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {(item) => (
          <TableRow key={item?.userId}>
            {columns.map((column) => (
              <TableCell
                key={column.uid}
                style={{
                  backgroundColor: `${dark ? "#212121" : ""}`,
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  overflowY: "auto",
                }}
              >
                {renderCell(item, column)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
