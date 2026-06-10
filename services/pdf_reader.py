from PyPDF2 import PdfReader

def extract_text_from_pdf_file(file):
    pdf = PdfReader(file)

    text = " "
    for page in pdf.pages:
        text += page.extract_text() or ""

    return text
