import ResultPage from "../components/ResultPage";
import VegaBarPlot from "../components/VegaBarPlot";

export const tabConfig = (data, setSelected, selected, plotConfig) => {
    const Tab1 = () => (
        <ResultPage
            data={data}
            setSelected={setSelected}
            selected={selected}
        />
    );
    const Tab2 = () => <VegaBarPlot data={data} plotConfig={plotConfig} />;
    return ([
        { id: 0, label: "All", component: <Tab1 /> },
        { id: 1, label: "Studies", component: <Tab1 /> },
        { id: 2, label: "Data", component: <Tab1 /> },
        { id: 3, label: "Documents", component: <Tab1 /> },
        { id: 4, label: "Plot", component: <Tab2 /> },
    ]);
}