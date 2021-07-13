import { Menu, Transition } from "@headlessui/react";
import { DetailedHTMLProps, FC } from "react";
import { Fragment } from "react";
import {
  Menu as MenuIcon,
  File as FileIcon,
  Star as StarIcon,
  Save as SaveIcon,
  Info as InfoIcon,
} from "react-feather";

export interface FileDropdownProps {
  new: () => any;
  open: () => any;
  save: () => any;
  about: () => any;
}

const FileDropdown: FC<FileDropdownProps> = ({
  new: newf,
  open,
  save,
  about,
}) => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className="flex justify-center items-center">
        <MenuIcon />
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute left-0 w-48 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="p-2">
          <Menu.Item>
            {({ active }) => (
              <DropdownButton onClick={newf} active={active}>
                <StarIcon size="16" />
                New
              </DropdownButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <DropdownButton onClick={open} active={active}>
                <FileIcon size="16" />
                Open
              </DropdownButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <DropdownButton onClick={save} active={active}>
                <SaveIcon size="16" />
                Save
              </DropdownButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <DropdownButton onClick={about} active={active}>
                <InfoIcon size="16" />
                About
              </DropdownButton>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);

const DropdownButton: FC<
  { active: boolean } & DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ active, className, ...props }) => {
  return (
    <button
      className={`${
        active ? "bg-blue-500 text-white" : "text-gray-900"
      } flex gap-2 rounded-md items-center w-full px-2 py-2 text-sm font-semibold`}
      {...props}
    />
  );
};

export default FileDropdown;
