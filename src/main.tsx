import { MantineProvider } from "@mantine/core";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/app/App";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import { StoreProvider } from "./app/providers/StoreProvider";

import "@/shared/scss/layout/index.scss";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ErrorBoundary>
		<BrowserRouter>
			<StoreProvider>
				<MantineProvider>
					<App />
				</MantineProvider>
			</StoreProvider>
		</BrowserRouter>
	</ErrorBoundary>,
);
