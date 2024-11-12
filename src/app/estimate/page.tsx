import EstimateForm from "../components/EstimateForm";

export default function Estimate() {
  return (
    <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold">Request for Estimate</h1>
        <EstimateForm />
    </div>
  );
}
