import { useEffect, useState } from "react";

const AudioUploaderWithPreview = ({
    audioFile = null,
    setAudioFile,
    audioUrl = null,
    name = "",
}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;
    const [previewSrc, setPreviewSrc] = useState(null);

    // Generate preview URL for audio
    useEffect(() => {
        if (audioFile) {
            const objectUrl = URL.createObjectURL(audioFile);
            setPreviewSrc(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else if (audioUrl) {
            setPreviewSrc(`${BASE_URL}${audioUrl}`);
        } else {
            setPreviewSrc(null);
        }
    }, [audioFile, audioUrl, BASE_URL]);

    return (
        <div>
            {/* Upload Field */}
            <label
                className="flex flex-col items-center justify-center w-full my-2 h-32 border-2 border-dashed rounded-lg cursor-pointer
        hover:border-purple-500 dark:border-gray-600 dark:hover:border-purple-400
        bg-gray-50 dark:bg-gray-800 transition-all duration-300"
            >
                <span className="text-gray-600 dark:text-gray-300 text-base">
                    Click to choose an audio file
                </span>

                <input
                    type="file"
                    name={name}
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => setAudioFile(e.target.files[0])}
                />
            </label>

            {/* Preview Section */}
            {previewSrc && (
                <div className="mt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        Selected File: {audioFile?.name || audioUrl?.split("/").pop()}
                    </p>

                    <div className="flex justify-center sm:justify-start mt-2">
                        <audio
                            controls
                            src={previewSrc}
                            className="w-full max-w-xs"
                        ></audio>
                    </div>
                </div>
            )}

            <p className="text-sm text-gray-500 dark:text-gray-400">
                Supported formats: MP3
            </p>
        </div>
    );
};

export default AudioUploaderWithPreview;
