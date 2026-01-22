import { useTranslation } from "react-i18next";

export default function WorkspaceList() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t("workspaces") || "Workspaces"}</h1>
		</div>
	);
}