import TidenceMark from './TidenceMark';

/** Mark plus lowercase wordmark, as set on the brand sheet. */
export default function Logo({ size = 26 }) {
  return (
    <>
      <TidenceMark size={size} />
      <span className="logo-word" translate="no">tidence</span>
    </>
  );
}
