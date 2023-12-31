import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";
import { Slider } from "./components/ui/slider";
import { Textarea } from "./components/ui/textarea";
import { Github, Wand2 } from "lucide-react";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { useState } from "react";
import { useCompletion } from "ai/react";

export function App() {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: `${import.meta.env.VITE_API_URI}/ai/generate`,
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-semibold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com ❤️ por Wellington Rodrigues
          </span>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" asChild>
            <a
              href="https://github.com/wellingtonrodriguesbr"
              target="_blank"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              Github
            </a>
          </Button>
        </div>
      </div>

      <main className="p-6 flex-1 flex gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-rows-2 flex-1 gap-4">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o promt para a IA.."
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA.."
              value={completion}
              readOnly
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável{" "}
            <code className="text-violet-400">{"{transcription}"}</code> no seu
            prompt para adicionar o conteúdo da transcrição do vídeo
            selecionado.
          </p>
        </div>
        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-6">
            <PromptSelect onPromptSelected={setInput} />
            <Separator />
            {/* <div className="space-y-2">
              <Label>Modelo</Label>
              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar esta opção em breve
              </span>
            </div>
            <Separator /> */}
            <div className="space-y-4">
              <Label>Temperatura</Label>
              <div className="flex flex-col gap-1">
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">0</span>
                  <span className="text-xs text-muted-foreground">1</span>
                </div>
              </div>

              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a ser mais criativos, porém, com
                possíveis erros.
              </span>
            </div>
            <Button disabled={isLoading} className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
