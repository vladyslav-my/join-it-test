import {
	Avatar, Button, Group, Popover, Text, TextInput,
} from "@mantine/core";
import { IconBell, IconHelp, IconSearch } from "@tabler/icons-react";
import clsx from "clsx";
import { FC, useState } from "react";
import { Logo } from "@/shared/ui/Logo";
import cls from "./Header.module.scss";

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
	return (
		<header className={clsx(cls.Header, className)}>
			<div className={cls.Header__logoField}>
				<Logo />
			</div>
			<TextInput
				className={cls.Header__search}
				placeholder="Search transactions, invoices or help"
				size="md"
				leftSection={<IconSearch size={18} />}
			/>
			<div className={cls.Header__actions}>
				<Button leftSection={<IconHelp size={18} />} variant="subtle">
					Support
				</Button>
				<Button variant="subtle">
					<IconBell size={18} />
				</Button>
				<Popover width="target" position="bottom" withArrow shadow="md">
					<Popover.Target>
						<button className={cls.Popover__button}>
							<Avatar className={cls.Popover__avatar} src="https://via.placeholder.com/40" alt="John Doe" radius="xl" />
							<Text className={cls.Popover__text}>John Doe</Text>
						</button>
					</Popover.Target>
					<Popover.Dropdown>
						Users links
					</Popover.Dropdown>
				</Popover>
			</div>
		</header>
	);
};
