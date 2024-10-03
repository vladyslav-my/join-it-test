import { AppLayout } from "@/widgets/AppLayout";
import cls from "./MainPage.module.scss";

export const MainPage = () => {
	return (
		<AppLayout className={cls.MainPage}>
			<h1 className={cls.MainPage__title}>Home</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla aut voluptas fugit cupiditate tempora soluta et eveniet quasi sequi earum porro, nemo ab molestiae? Qui nemo architecto minus non inventore.</p>
		</AppLayout>
	);
};
