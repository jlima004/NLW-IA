import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { FileVideo, Upload } from 'lucide-react'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  function handleFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.currentTarget

    if (!files) return

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  const previewURL = useMemo(() => {
    if (!videoFile) return null

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  function handleUploadVideo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) return

    // converter o vídeo em audio
    
  }

  return (
    <form onSubmit={handleUploadVideo} className="space-y-4">
      <label
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/10"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um vídeo
          </>
        )}
      </label>

      <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected} />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de Transcrição</Label>

        <Textarea
          ref={promptInputRef}
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
        />
      </div>

      <Button type="submit" className="w-full">
        Carregar vídeo
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}
