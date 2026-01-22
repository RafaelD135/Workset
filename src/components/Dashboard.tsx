import { useTranslation } from "react-i18next";

export default function Dashboard() {
	const { t } = useTranslation();
	
	return (
		<div>
			<h1>{t("dashboard") || "Dashboard"}</h1>
		</div>
	);
}