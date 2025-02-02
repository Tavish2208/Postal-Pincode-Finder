import PincodeFinder from './PincodeFinder';

export default function Home() {
  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h1>Postal Pincode Finder</h1>
      <PincodeFinder />
    </div>
  );
}
