import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../../public/assets/assets/css/remixicon.css'
import '../../public/assets/assets/css/lib/bootstrap.min.css'
import '../../public/assets/assets/css/lib/apexcharts.css'
import '../../public/assets/assets/css/lib/dataTables.min.css'
import '../../public/assets/assets/css/lib/editor.atom-one-dark.min.css'
import '../../public/assets/assets/css/lib/editor.quill.snow.css'
import '../../public/assets/assets/css/lib/flatpickr.min.css'
import '../../public/assets/assets/css/lib/full-calendar.css'
import '../../public/assets/assets/css/lib/jquery-jvectormap-2.0.5.css'
import '../../public/assets/assets/css/lib/magnific-popup.css'
import '../../public/assets/assets/css/lib/slick.css'
import '../../public/assets/assets/css/lib/prism.css'
import '../../public/assets/assets/css/lib/file-upload.css'
import '../../public/assets/assets/css/lib/audioplayer.css'
import '../../public/assets/assets/css/style.css'
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "OneMetric Admin",
    description: "OneMetric App",
    icons: {
        icon: "/favicon.ico",
        apple: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
            <Script src="/assets/assets/js/lib/jquery-3.7.1.min.js"></Script>
            <Script src="/assets/assets/js/lib/bootstrap.bundle.min.js"></Script>
            <Script src="/assets/assets/js/lib/dataTables.min.js"></Script>
            <Script src="/assets/assets/js/lib/iconify-icon.min.js"></Script>
            <Script src="/assets/assets/js/lib/jquery-ui.min.js"></Script>
            <Script src="/assets/assets/js/lib/jquery-jvectormap-2.0.5.min.js"></Script>
            <Script src="/assets/assets/js/lib/jquery-jvectormap-world-mill-en.js"></Script>
            <Script src="/assets/assets/js/lib/magnifc-popup.min.js"></Script>
            <Script src="/assets/assets/js/lib/slick.min.js"></Script>
            <Script src="/assets/assets/js/lib/prism.js"></Script>
            <Script src="/assets/assets/js/lib/file-upload.js"></Script>
            <Script src="/assets/assets/js/lib/audioplayer.js"></Script>
            <Script src="/assets/assets/js/app.js" defer></Script>
        </html>
    );
}
