import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './ShareButtons.css';

function ShareButtons({ pollId, question }) {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const pollUrl = `${window.location.origin}/poll/${pollId}`;
  const shareText = `Vote on my poll: ${question}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pollUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pollUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pollUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pollUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pollUrl)}`;
    window.open(linkedinUrl, '_blank', 'width=550,height=420');
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pollify Poll',
          text: shareText,
          url: pollUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="share-buttons">
      <h3 className="share-title">📤 Share This Poll</h3>
      
      <div className="share-grid">
        <button onClick={copyToClipboard} className="share-btn copy-btn">
          <span className="share-icon">{copied ? '✓' : '🔗'}</span>
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        <button onClick={shareOnTwitter} className="share-btn twitter-btn">
          <span className="share-icon">𝕏</span>
          <span>Twitter</span>
        </button>

        <button onClick={shareOnFacebook} className="share-btn facebook-btn">
          <span className="share-icon">f</span>
          <span>Facebook</span>
        </button>

        <button onClick={shareOnWhatsApp} className="share-btn whatsapp-btn">
          <span className="share-icon">💬</span>
          <span>WhatsApp</span>
        </button>

        <button onClick={shareOnLinkedIn} className="share-btn linkedin-btn">
          <span className="share-icon">in</span>
          <span>LinkedIn</span>
        </button>

        <button onClick={() => setShowQR(!showQR)} className="share-btn qr-btn">
          <span className="share-icon">📱</span>
          <span>QR Code</span>
        </button>

        {navigator.share && (
          <button onClick={shareNative} className="share-btn native-btn">
            <span className="share-icon">📲</span>
            <span>More...</span>
          </button>
        )}
      </div>

      {showQR && (
        <div className="qr-code-container">
          <div className="qr-code-wrapper">
            <QRCodeSVG 
              value={pollUrl} 
              size={200}
              level="H"
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>
          <p className="qr-instructions">Scan to vote on your phone!</p>
          <button 
            onClick={() => {
              // Download QR code
              const svg = document.querySelector('.qr-code-wrapper svg');
              const svgData = new XMLSerializer().serializeToString(svg);
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const img = new Image();
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.download = `poll-${pollId}-qr.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
              };
              img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
            }}
            className="download-qr-btn"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}

export default ShareButtons;

