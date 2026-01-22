import { useTranslation } from "react-i18next";

export default function TaskList() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t("tasks") || "Tasks"}</h1>
		</div>
	);
}